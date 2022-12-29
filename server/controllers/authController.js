import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from 'config';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import sendEmail from '../utils/email.js';

const signToken = (id) => {
	return jwt.sign(
		{ id },
		config.get('JWT_SECRET'),
		{ expiresIn: config.get('JWT_EXPIRES_IN') }
	);
};

// creating a json web token and send to user; should always store JWTs inside a 'httpOnly' cookie
// cookie is a string that a server can send to a client; client (browser) stores the cookie and sends it with all future requests to that same server
const createAndSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(
			Date.now() + config.get('JWT_COOKIE_EXPIRES_IN') * 24 * 60 * 60 * 1000
		),
		// cookie cannot be accessed or modified by the browser
		httpOnly: true
	}

	if (config.get('NODE_ENV') === 'production') {
		// cookie only be sent on an sencrypted connection (HTTPS)
		cookieOptions.secure = true
	}

	res
		.cookie(
			'jwt',
			token,
			cookieOptions
		);

	// remove password from output
	user.password = undefined;

	// login a new user by sending jwt token 
	res
		.status(statusCode)
		.json({
			status: 'Success',
			token,
			data: {
				user
			}
		});
}

export const signup = catchAsync(async (req, res) => {
	const { name, email, password, passwordConfirm } = req.body;

	const newUser = await User.create({
		name,
		email,
		password,
		passwordConfirm
	});

	createAndSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password are input
	if (!email || !password) {
		return next(
			new AppError(
				'Please provide an email and password',
				400
			)
		);
	}

	// 2) Check if user exists && password is correct
	// 'password' property is not included in document by default (because 'select: false' in schema);
	// explicitly getting the 'password' so we can use it here to check if matching password to inputted
	const user = await User
		.findOne({ email })
		.select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(
			new AppError(
				'Incorrect email or password',
				401
			)
		);
	}

	createAndSendToken(user, 200, res);

	next();
});

// protect a route; allow access if current user is logged in
export const protect = catchAsync(async (req, res, next) => {
	let token;
	const requestHeader = req.headers;

	// 1) Getting token and checking if it exists;
	// code convention to create a header in a request called 'authorization'
	// and the value being a string called 'Bearer [...token goes here...]'
	if (requestHeader.authorization && requestHeader.authorization.startsWith('Bearer')) {
		token = requestHeader.authorization.split(' ')[1];
	}

	if (!token) {
		return next(
			new AppError(
				'You are not logged in. Please log in to gain access',
				401
			)
		);
	}

	// 2) checking if token is valid and if payload/token has not been altered
	// if payload has been altered, token would be altered, failing verify
	const decodedToken = await promisify(jwt.verify)(token, config.get('JWT_SECRET'));

	// 3) Check if user still exists
	const user = await User.findById(decodedToken.id);

	if (!user) {
		return next(
			new AppError(
				'The user belonging to this token no longer exists',
				401
			)
		);
	}

	// 4) Check if user changed password after the token was issued
	// 'iat' means 'issued at token'
	if (user.changedPassword(decodedToken.iat)) {
		return next(
			new AppError(
				'This user recently changed their password. Please log in again',
				401
			)
		);
	}

	// put entire user data into request object in a 'user' prop
	// if we want to pass data from middleware to middleware, add props to the 'req' object
	req.user = user;

	next();
});

export const forgotPassword = catchAsync(async (req, res, next) => {
	// 1) get user based on POSTed email that they provided
	const user = await User.findOne({
		email: req.body.email
	});

	if (!user) {
		return next(
			new AppError(
				'There is no user with that email address',
				404
			)
		);
	}

	// 2) generate a random reset token
	const resetToken = user.createPasswordResetToken();

	// modified properties on document are not saved unless explicitly call '.save()' method
	await user.save({
		// don't require validation for this document save
		validateBeforeSave: false
	});

	// 3) send the token to user's email
	const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
	const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n
		If you didn't forget your password, please ignore this email`;

	try {
		await sendEmail({
			// or 'req.body.email'
			email: user.email,
			subject: 'Your password reset token is valid for 10 mins',
			message
		});
	
		res.status(200).json({
			status: 'success',
			message: 'Token sent to email'
		});
	} catch(error) {
		// if error occurs, reset the passwordResetToken and passwordResetExpires properties on current user document
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;

		// save the modified changes above
		await user.save({
			validateBeforeSave: false
		});

		return next(
			new AppError(
				'There was an error sending the email. Try again later',
				500
			)
		);
	}
});

export const resetPassword = catchAsync(async (req, res, next) => {
	// 1) Encrypt the token passed in params to compare with the encrypted 'passwordResetToken' assigned to the user in db
	//	'req.params' because ':token' is a dynamic path in the '/resetPassword/:token' route
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: {
			// check if the token hasn't expired
			$gt: Date.now()
		}
	});

	if (!user) {
		return next(
			new AppError(
				'Token is invalid or has expired',
				400
			)
		);
	}

	// 2) modify document to the new password and other props then save
	// User model validates on '.save()' and '.create()' so will compare if 'password' === 'passwordConfirm'
	// if not matching error is thrown and caught in 'catchAsync()'
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 3) Update the 'changedPasswordAt' property for the user
	// ...ran in userModel middlware pre save hook due to '.save()' above

	createAndSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
	// 1) Get user by id; 'req.user' is assigned in 'protect' function middleware ran before this middleware in '/updateMyPassword' route
	// 'password' has 'select: false' property, so isn't returned in queries by default; '+password' is required if needed to select
	const user = await User
		.findById(req.user.id)
		.select('+password');

	// 2) Check if the POSTed password is correct
	if ( !(await user.correctPassword(req.body.passwordCurrent, user.password)) ) {
		return next(
			new AppError(
				'Your current password is wrong',
				401
			)
		);
	}

	user.password = req.body.passwordNew;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	createAndSendToken(user, 200, res);
});

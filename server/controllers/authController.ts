/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable import/no-import-module-exports */
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user/userModel';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { sendEmail } from '../utils/email';
import { IStringMap } from '../tsModels/interfaces';
import { IUserDocumentProps } from '../models/user/IUserDocumentProps';

const { promisify }: any = require('util');

const signToken = (id: string): string => jwt.sign(
	{ id },
	process.env.JWT_SECRET,
	{ expiresIn: process.env.JWT_EXPIRES_IN }
);

// Login and send JWT to client via cookie
const createAndSendToken = (
	user: IUserDocumentProps,
	statusCode: number,
	res: Response
) => {
	const token: string = signToken(user._id);
	const cookieOptions: any = {
		expires: new Date(
			Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
		),
		httpOnly: true
	};

	if (process.env.NODE_ENV === 'production') {
		// cookie only sent on an sencrypted connection (HTTPS)
		cookieOptions.secure = true;
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
};

exports.signup = catchAsync(
	async (
		req: Request,
		res: Response
	) => {
		const {
			name, email, password, passwordConfirm
		}: IStringMap = req.body;

		const newUser: IUserDocumentProps | null = await User.create({
			name,
			email,
			password,
			passwordConfirm
		});

		createAndSendToken(newUser, 201, res);
	}
);

exports.login = catchAsync(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { email, password }: IStringMap = req.body;

		// 1) Check if email and password are input
		if (!email || !password) {
			return next(
				new AppError(
					'Please provide email and password',
					400
				)
			);
		}

		// 2) Check if user exists && password is correct
		// 'password' property is not included in document by default (because 'select: false' in schema);
		// explicitly getting the 'password' in order to use it here
		const user: IUserDocumentProps | null = await User
			.findOne({ email })
			.select('+password');

		if (!user || (user.password && !(await user.correctPassword(password, user.password)))) {
			return next(
				new AppError(
					'Incorrect email or password',
					401
				)
			);
		}

		createAndSendToken(user, 200, res);

		next();
	}
);

// protected route (if current user is logged in)
exports.protect = catchAsync(
	async (
		req: Request,
		_: Response,
		next: NextFunction
	) => {
		let token: string = '';
		const requestHeader: any = req.headers;

		// 1) Getting token and checking if it exists;
		// code convention to create a header in request called 'authorization'
		// and the value being a string 'Bearer [...token goes here...]'
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
		const decodedToken: any = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		// 3) Check if user still exists
		const user: IUserDocumentProps | null = await User.findById(decodedToken.id);

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

		// put entire user data into request object in 'user' prop (express)
		// if we want to pass data from middleware to middleware, add props to the 'req' object
		// @ts-ignore
		req.user = user;

		next();
	}
);

// if the user's 'role' is not included in the arguments, they don't have access (throw error)
// Express automatically passes the 3 arguments req, res, next for middleware functions
exports.restrictTo = (...roles: string[]) => (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	// @ts-ignore
	if (!roles.includes(req.user.role)) {
		return next(
			new AppError(
				'You do not have permission to perform this action',
				403
			)
		);
	}

	next();
};

exports.forgotPassword = catchAsync(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		// 1) get user based on POSTed email that they provided
		const user: IUserDocumentProps | null = await User.findOne({
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
		const resetToken: string = user.createPasswordResetToken();

		await user.save({
			validateBeforeSave: false
		});

		// 3) send the token to user's email
		const resetURL: string = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
		const message: string = `Forgot your password? Submit a PATCH request with your new password and 
		passwordConfirm to: ${resetURL}.\n If you didn't forget your password, please ignore this email`;

		try {
			await sendEmail({
				email: user.email,
				subject: 'Your password reset token is valid for 10 mins',
				message
			});

			res.status(200).json({
				status: 'success',
				message: 'Token sent to email'
			});
		} catch (error) {
			// if error occurs, reset the 'passwordResetToken' and 'passwordResetExpiresAt'
			// properties on current user document
			user.passwordResetToken = undefined;
			user.passwordResetExpiresAt = undefined;

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
	}
);

exports.resetPassword = catchAsync(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		// 1) Encrypt the token passed in params to compare with the encrypted 'passwordResetToken'
		// 'req.params' because ':token' is a dynamic path in the '/resetPassword/:token' route
		const hashedToken: string = crypto
			.createHash('sha256')
			.update(req.params.token)
			.digest('hex');

		const user: IUserDocumentProps | null = await User.findOne({
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
		user.passwordResetExpiresAt = undefined;

		await user.save();

		// 3) Update the 'changedPasswordAt' property for the user
		// ...ran in userModel middlware pre save hook due to '.save()' above

		createAndSendToken(user, 200, res);
	}
);

exports.updatePassword = catchAsync(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		// 1) Get user by id; 'req.user' is assigned in 'protect' function middleware
		// ran before this middleware in '/updateMyPassword' route
		const user: IUserDocumentProps | null = await User
			// @ts-ignore
			.findById(req.user.id)
			.select('+password');

		if (user && user.password) {
			// 2) Check if the POSTed password is correct
			if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
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
		}
	}
);

import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import {
	getOne,
	getAll,
	updateOne,
	deleteOne
} from '../utils/controllerUtils.js';

const filterObject = (object, ...persistedFields) => {
	const filteredObject = {};

	Object.keys(object).forEach(curr => {
		if (persistedFields.includes(curr)) {
			filteredObject[curr] = object[curr]
		}
	});

	return filteredObject;
};

export const getUser = getOne(User);

export const getAllUsers = getAll(User);

export const updateUser = updateOne(User);

// 'admin' to delete a 'user' document
export const deleteUser = deleteOne(User);

export const getMe = (req, res, next) => {
	// 'req.user' property assigned during 'protect' middlware (which checks if a user is currently logged in)
	req.params.id = req.user.id
};

// 'user' to update their own document
export const updateMe = catchAsync(async (req, res, next) => {
	// 1) Throw error if a user tries to update password data
	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError(
				'This route is not for password updates. Please use /updateMyPassword',
				400
			)
		)
	}

	// 2) Update the user document
	// only allow the 'name' and 'email' properties to be updateable on a user document
	const filteredBody = filterObject(req.body, 'name', 'email');

	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		filteredBody,
		{
			new: true,
			runValidators: true
		});

	res
		.status(200)
		.json({
			status: 'success',
			data: {
				user: updatedUser
			}
		});
});

// 'user' to set their data as 'inactive' but data still exists
// not deleting document, but setting 'active: false'
// then not selecting 'active: false 'documents in user document pre query hook
export const deleteMe = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(
		req.user.id,
		{
			active: false
		}
	);

	res
		.status(204)
		.json({
			status: 'success',
			data: null
		});
});

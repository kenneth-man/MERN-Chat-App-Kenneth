import User from '../models/userModel.js';
import {
	getOne,
	getAll,
	updateOne,
	deleteOne
} from '../utils/controllerUtils.js';

export const getUser = getOne(User);

export const getAllUsers = getAll(User);

export const updateUser = updateOne(User);

export const deleteUser = deleteOne(User);

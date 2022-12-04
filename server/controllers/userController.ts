import {
	getOne,
	updateOne,
	deleteOne
} from '../utils/controllerUtils';
import { User } from '../models/userModel';
import { ExpressMiddleware } from '../tsModels/types';

export const getUser: ExpressMiddleware = getOne(User);

export const updateUser: ExpressMiddleware = updateOne(User);

export const deleteUser: ExpressMiddleware = deleteOne(User);

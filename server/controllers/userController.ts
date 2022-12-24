import {
	getOne,
	updateOne,
	deleteOne
} from '../utils/controllerUtils';
import { User } from '../models/user/userModel';
import { ExpressMiddleware } from '../tsModels/types';

export const getUser: ExpressMiddleware = getOne(User);

export const updateUser: ExpressMiddleware = updateOne(User);

export const deleteUser: ExpressMiddleware = deleteOne(User);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const testGetAllUsers = async (req: any, res: any) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const users: any = await User.find();

		res
			.status(200)
			.json({
				status: 'success',
				users
			});
	} catch (err) {
		res
			.status(404)
			.json({
				status: 'failed',
				message: err
			});
	}
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { Document, Query, Model } from 'mongoose';
import { catchAsync } from './catchAsync';
import { AppError } from './appError';
import { APIFeatures } from './apiFeatures';
import { ExpressMiddleware } from '../tsModels/types';

export const createOne = (Model: Model<any>): ExpressMiddleware => catchAsync(
	async (
		req: Request,
		res: Response
	) => {
		const document: Document = await Model.create(req.body);

		// sending back json in the res; '.json()' ends the 'req res cycle'
		res
			.status(201)
			.json({
				status: 'success',
				data: document
			});
	}
);

export const getOne = (
	Model: Model<any>,
	populateOptions?: Object
): ExpressMiddleware => catchAsync(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		let query: Query<any, any> = Model.findById(req.params.id);

		if (populateOptions) {
			query = query.populate(populateOptions);
		}

		const document: Document = await query;

		if (!document) {
			return next(
				new AppError(
					'No Document found with a matching ID',
					404
				)
			);
		}

		res
			.status(200)
			.json({
				status: 'success',
				data: document
			});
	}
);

export const getAll = (Model: Model<any>): ExpressMiddleware => catchAsync(
	async (
		req: Request,
		res: Response
	) => {
		// to allow for nested GET reviews on Tour
		let filter: Object = {};

		if (req.params.tourId) {
			filter = {
				tour: req.params.tourId
			};
		}

		// BUILD QUERY
		const features: APIFeatures = new APIFeatures(Model.find(filter), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		// EXECUTE QUERY
		const document: Document = await features.query;

		// SEND RESPONSE
		res
			.status(200)
			.json({
				status: 'success',
				data: document
			});
	}
);

export const updateOne = (Model: Model<any>): ExpressMiddleware => catchAsync(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const document: Document = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			// enable built in mongoose validators
			runValidators: true
		});

		if (!document) {
			return next(
				new AppError(
					'No Document found with a matching ID',
					404
				)
			);
		}

		res
			.status(200)
			.json({
				status: 'success',
				data: document
			});
	}
);

export const deleteOne = (Model: Model<any>): ExpressMiddleware => catchAsync(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const document: Document = await Model.findByIdAndDelete(req.params.id);

		if (!document) {
			return next(
				new AppError(
					'No Document found with a matching ID',
					404
				)
			);
		}

		res
			.status(204)
			.json({
				status: 'success',
				data: null
			});
	}
);

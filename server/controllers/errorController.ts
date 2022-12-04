/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

// handling invalid database IDs
const handleCastErrorDB = (err: any): AppError => new AppError(
	`Invalid ${err.path}: ${err.value}`,
	400
);

// handling duplicate database fields
const handleDuplicateFieldsDB = (err: any): AppError => {
	// RegEx: Grabbing values between quotation marks
	const value: string = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message: string = `Duplicate field value: ${value}. Please use another value`;

	return new AppError(message, 400);
};

// handling mongoose validation errors in schema
const handleValidationErrorDB = (err: any): AppError => {
	const errors: string[] = Object.values(err.errors).map((curr: any) => curr.message);
	const message: string = `Invalid input data: ${errors.join('. ')}`;

	return new AppError(message, 400);
};

// JWT token verification error from 'jwt.verify()' in 'authController'
const handleJWTError = (err: any): AppError => new AppError(
	`Invalid token: ${err}. Please try logging in again`,
	401
);

// JWT token has expired; duration set in .env as 'JWT_EXPIRES_IN'
const handleJWTExpiredError = (err: any): AppError => new AppError(
	`Expired token: ${err}. Please log in again to generate new token`,
	401
);

const setErrorObject = (
	error: any,
	res: Response
): void => {
	// Operational, trusted error: send message to client
	if (error.isOperational) {
		let conditionalErrorObject: Object = {};
		let { statusCode }: any = error;

		statusCode = statusCode || 500;

		if (process.env.NODE_ENV === 'development') {
			let { status }: any = error;
			const { message, stack }: any = error;

			status = status || 'error';

			conditionalErrorObject = {
				status,
				error,
				message,
				stack
			};
		}

		if (process.env.NODE_ENV === 'production') {
			// not good practice to mutate argument values
			let errorCopy: any = { ...error };

			if (errorCopy.name === 'CastError') {
				errorCopy = handleCastErrorDB(errorCopy);
			}

			if (errorCopy.code === 11000) {
				errorCopy = handleDuplicateFieldsDB(errorCopy);
			}

			if (errorCopy.name === 'ValidationError') {
				errorCopy = handleValidationErrorDB(errorCopy);
			}

			if (errorCopy.name === 'JsonWebTokenError') {
				errorCopy = handleJWTError(errorCopy);
			}

			if (errorCopy.name === 'TokenExpiredError') {
				errorCopy = handleJWTExpiredError(errorCopy);
			}

			conditionalErrorObject = {
				status: errorCopy.status,
				message: errorCopy.message
			};
		}

		res
			.status(statusCode)
			.json(conditionalErrorObject);

		return;
	}

	console.log(error);

	// unknown error; send generic error message to client
	// don't leak error details or vulnerabilities
	res
		.status(500)
		.json({
			status: 'Error',
			message: 'Something went very wrong'
		});
};

// by specifying 4 parameters, express recognizes this as an error handling middleware function
// (must provide 4 parameters)
export const errorController = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	setErrorObject(error, res);
};

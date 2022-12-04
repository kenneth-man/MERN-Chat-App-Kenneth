export class AppError extends Error {
	statusCode: number;

	status: string;

	isOperational: boolean;

	constructor(
		message: string,
		statusCode: number
	) {
		super(message);

		this.statusCode = statusCode;
		this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
		this.isOperational = true;

		// create a property called 'stack' on the error object to contain the error stacktrace
		Error.captureStackTrace(this, this.constructor);
	}
}

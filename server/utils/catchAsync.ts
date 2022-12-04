import { Request, Response, NextFunction } from 'express';

// instead of including 'try catch' blocks in each controller function;
// wrap async functions with this function to catch errors
export const catchAsync = (asyncFunction: Function) => (
	req: Request,
	res: Response,
	next: NextFunction
) => asyncFunction(req, res, next).catch(next);

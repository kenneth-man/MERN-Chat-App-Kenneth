/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export type ExpressMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => any;

export type ExpressErrorMiddleware = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => any;

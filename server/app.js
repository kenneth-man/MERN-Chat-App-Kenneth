import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import userRouter from './routes/userRoutes.js';
// import AppError from './utils/appError.js';
import errorController from './controllers/errorController.js';

const app = express();

// adding Security HTTP Headers to req and res
app.use(helmet());

// limit 10000 requests from the same IP address per hour
const limiter = rateLimit({
	max: 10000,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/api', limiter);

// data sanitization against NoSQL query injections
app.use(mongoSanitize());

// data sanitization against XSS (Cross Site Scripting) attacks
app.use(xss());

// route middleware
app.use('/api/v1/users', userRouter);

// // handling all unknown routes
// app.all('*', (req: Request, res: Response, next: NextFunction) => {
// 	// passing an argument into 'next()' skips all subsequent middleware and goes to the error handling middleware
// 	next(
// 		new AppError(
// 			`Can't find ${req.originalUrl} on this server`,
// 			404
// 		)
// 	);
// });

// error handling middleware
app.use(errorController);

export default app;

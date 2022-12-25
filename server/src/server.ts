/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from 'config';
import { Server } from 'http';
import app from './app';

// 'dotenv' wasn't working, using 'config' for env variables instead
mongoose
	.connect(
		config.get<string>('database'),
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		}
	);

const server: Server = app.listen(
	config.get<string>('port'),
	() => console.log(`App running on port ${config.get<string>('port')}`)
);

process.on(
	'unhandledRejection',
	(err: unknown) => {
		console.log(`${err}. Exiting application`);

		// callback ran after server is closed
		server.close(() => process.exit(1));
	}
);

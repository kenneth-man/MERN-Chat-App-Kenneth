import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'http';
import app from './app.js';

// Dotenv loads environment variables from the .env file into process.env
// loads the environment variables regardless of what system you are developing on
dotenv.config({ path: '../.env' });

mongoose
	.connect(
		process.env.DATABASE || '',
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		}
	);

const server: Server = app.listen(
	process.env.PORT,
	() => console.log(`App running on port ${process.env.PORT}`)
);

process.on(
	'unhandledRejection',
	(err) => {
		console.log(`${err}. Exiting application`);

		// callback ran after server is closed
		server.close(() => process.exit(1));
	}
);

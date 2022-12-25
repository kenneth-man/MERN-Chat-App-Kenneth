import mongoose from 'mongoose';
import config from 'config';
import app from './app.js';

// 'dotenv' wasn't working, so using 'config' for env variables instead
mongoose
	.connect(
		config.get('database'),
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		}
	);

const server = app.listen(
	config.get('port'),
	() => console.log(`App running on port ${config.get('port')}`)
);

process.on(
	'unhandledRejection',
	(err) => {
		console.log(`${err}. Exiting application`);

		// callback ran after server is closed
		server.close(() => process.exit(1));
	}
);

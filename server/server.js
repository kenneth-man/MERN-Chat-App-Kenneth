import mongoose from 'mongoose';
import app from './app.js';

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

const server = app.listen(
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

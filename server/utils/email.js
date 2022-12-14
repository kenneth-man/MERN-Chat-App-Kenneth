import nodemailer from 'nodemailer';
import config from 'config';
import { generateEmailText, generateEmailHTML } from './emailContents.js';

const sendEmail = async (options) => {
	const {
		email,
		subject,
		resetURL
	} = options;

	// 1) Create a transporter
	const transporter = nodemailer.createTransport({
		host: config.get('EMAIL_HOST'),
		port: config.get('EMAIL_PORT'),
		auth: {
			user: config.get('EMAIL_USERNAME'),
			pass: config.get('EMAIL_PASSWORD')
		}
		// service: 'Gmail',
		// also if using gmail, activate 'last secure app' option
	});

	// 2) Define the email options
	const mailOptions = {
		from: config.get('EMAIL_FROM'),
		to: email,
		subject,
		text: generateEmailText(resetURL),
		html: generateEmailHTML(resetURL) 
	}

	// 3) Send the email
	await transporter.sendMail(mailOptions);
}

export default sendEmail;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-import-module-exports */
import nodemailer from 'nodemailer';
import { IStringMap } from '../tsModels/interfaces';

export const sendEmail = async (options: IStringMap) => {
	const {
		EMAIL_HOST,
		EMAIL_PORT,
		EMAIL_USERNAME,
		EMAIL_PASSWORD
	}: IStringMap = process.env;

	const {
		email,
		subject,
		message
	}: IStringMap = options;

	// 1) Create a transporter
	const transporter: any = nodemailer.createTransport({
		host: EMAIL_HOST,
		port: EMAIL_PORT,
		auth: {
			user: EMAIL_USERNAME,
			pass: EMAIL_PASSWORD
		}
		// service: 'Gmail',
		// also if using gmail, activate 'last secure app' option
	});

	// 2) Define the email options
	const mailOptions: IStringMap = {
		from: 'Kenneth Man <kennethwaikinman@gmail.com>',
		to: email,
		subject,
		text: message
		// html:
	};

	// 3) Send the email
	await transporter.sendMail(mailOptions);
};

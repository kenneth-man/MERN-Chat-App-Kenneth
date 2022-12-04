/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Model, model } from 'mongoose';
import validator from 'validator';

const userSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A user must have a name'],
			validate: [validator.isAlpha, 'Name must consist of only letters']
		},
		email: {
			type: String,
			required: [true, 'Please provide an email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Email must be of a valid format']
		},
		photo: {
			type: String
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user'
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			minLength: [8, 'A password must be equal to or greater than 8 characters'],
			select: false
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password'],
			// validation only runs when creating '.create()' or saving '.save()' a document
			// doesn't run when 'updating' e.g. findByIdAndUpdate()
			validate: [
				function (value: string) {
					return value === this.password;
				},
				'Passwords must match'
			]
		},
		passwordChangedAt: {
			type: Date
		},
		passwordResetToken: {
			type: String
		},
		passwordResetExpiresAt: {
			type: Date
		},
		active: {
			type: Boolean,
			default: true,
			select: false
		}
	}
);

export const User: Model<any> = model('User', userSchema);

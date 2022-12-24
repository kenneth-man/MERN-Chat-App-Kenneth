/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
// import { NextFunction } from 'express';
import { Schema, Model, model } from 'mongoose';
// import { bcrypt } from 'bcryptjs';
import validator from 'validator';
import { IUserDocumentProps } from './IUserDocumentProps';

const userSchema: Schema<IUserDocumentProps> = new Schema(
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

// encryption of user passwords
// @ts-ignore
// userSchema.pre('save', async function (next: NextFunction): void {
// 	if (!this.isModified('password')) return next();

// 	this.password = await bcrypt.hash(this.password, 12);

// 	// remove the 'passwordConfirm' property; not included in the new document
// 	this.passwordConfirm = undefined;

// 	next();
// });

// if password has been modified, update 'passwordChangedAt' property in the current user document
// @ts-ignore
// userSchema.pre('save', function (next: NextFunction): void {
// 	if (!this.isModified('password') || this.isNew) return next();

// 	// - 1 second to make sure this prop is less than the token created (created after passworChangedAt)
// 	this.passwordChangedAt = new Date(Date.now() - 1000);

// 	next();
// });

// find user documents where 'active' property is true
// @ts-ignore
// userSchema.pre(/^find/, function (next: NextFunction): void {
// 	// @ts-ignore
// 	this.find({
// 		active: {
// 			$ne: false
// 		}
// 	});

// 	next();
// });

// userSchema.methods.correctPassword = async function (
// 	candidatePassword: string,
// 	userPassword: string
// ): Promise<boolean> {
// 	return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.changedPassword = function (JWTTimestamp: number): boolean {
// 	if (this.passwordChangedAt) {
// 		// converted 'passwordChangedAt' to timestamp format for comparison with 'JWTTimestamp'
// 		const passwordChangedAtTimestamp: number = parseInt(
// 			String(this.passwordChangedAt.getTime() / 1000),
// 			10
// 		);

// 		return JWTTimestamp < passwordChangedAtTimestamp;
// 	}

// 	return false;
// };

// userSchema.methods.createPasswordResetToken = function (): string {
// 	// @ts-ignore
// 	const resetToken: string = crypto.randomBytes(32).toString('hex');

// 	this.passwordResetToken = crypto
// 		// @ts-ignore
// 		.createHash('sha256')
// 		.update(resetToken)
// 		.digest('hex');

// 	// password expires in 10 minutes
// 	this.passwordResetExpiresAt = new Date(Date.now() + (10 * 60 * 1000));

// 	return resetToken;
// };

export const User: Model<IUserDocumentProps> = model('User', userSchema);

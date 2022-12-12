import { Document } from 'mongoose';

export interface IUserDocumentProps extends Document {
	name: string;
	email: string;
	photo: string;
	role: string;
	password: string | undefined;
	passwordConfirm: string | undefined;
	passwordChangedAt: Date;
	passwordResetToken: string | undefined;
	passwordResetExpiresAt: Date | undefined;
	active: boolean;
	correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
	changedPassword: (JWTTimestamp: number) => boolean;
	createPasswordResetToken: () => string;
}

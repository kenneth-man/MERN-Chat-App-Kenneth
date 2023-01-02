export interface IForgotPassword {
	sendingEmail: string;
	setSendingEmail: (arg: string) => void;
	emailSent: boolean;
	handleEmailSend: () => Promise<void>;
}

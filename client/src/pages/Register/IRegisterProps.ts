export interface IRegisterProps {
	registerName: string;
	setRegisterName: (arg: string) => void;
	registerEmail: string;
	setRegisterEmail: (arg: string) => void;
	registerPassword: string;
	setRegisterPassword: (arg: string) => void;
	registerPasswordConfirm: string;
	setRegisterPasswordConfirm: (arg: string) => void;
	handleSignupOnSubmit: () => Promise<void>;
}

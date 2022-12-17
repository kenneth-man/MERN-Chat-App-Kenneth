/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';

export interface ILoginProps {
	loginEmail: string;
	setLoginEmail: (arg: string) => void;
	loginPassword: string;
	setLoginPassword: (arg: string) => void;
	handleOnChange: (
		event: ChangeEvent<HTMLInputElement>,
		setState: (arg: any) => void
	) => void;
}

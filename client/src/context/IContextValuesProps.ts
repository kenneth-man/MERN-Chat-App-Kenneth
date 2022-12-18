/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';
import { IErrorProps } from '../components/Error/IErrorProps';

export interface IContextValuesProps {
	error: IErrorProps | undefined;
	setError: (arg: IErrorProps) => void;
	loading: boolean;
	setLoading: (arg: boolean) => void;
	handleOnChange: (
		event: ChangeEvent<HTMLInputElement>,
		setState: (arg: any) => void
	) => void;
	isUserLoggedIn: boolean;
	setIsUserLoggedIn: (arg: boolean) => void;
}

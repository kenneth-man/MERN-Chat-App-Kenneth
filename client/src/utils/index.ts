/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';
import { IErrorProps } from '../components/Error/IErrorProps';

// re-usable static functions; not putting in context as to not end up with a huge cluttered context file
export class Utils {
	static handleOnChange = (
		event: ChangeEvent<HTMLInputElement>,
		setState: (arg: any) => void
	): void => {
		setState(event.target.value);
	};

	static handleError = (
		errorObj: IErrorProps,
		setError: (arg: IErrorProps | undefined) => void,
		setLoading: (arg: boolean) => void,
		setStates: ((arg: string) => void)[]
	): void => {
		setError(errorObj);
		setLoading(false);
		setStates.forEach((curr: (arg: string) => void) => curr(''));
	};

	static handleUpdateToken = (
		token: string | null,
		setUserToken: (arg: string | null) => void
	): void => {
		setUserToken(token);

		if (token) {
			window.localStorage.setItem('userToken', token);

			return;
		}

		window.localStorage.removeItem('userToken');
	};
}

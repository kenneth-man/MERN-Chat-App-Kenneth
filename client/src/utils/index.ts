/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';
import { IErrorProps } from '../components/Error/IErrorProps';

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
}

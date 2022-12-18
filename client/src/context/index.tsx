/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
	createContext, useState, ChangeEvent
} from 'react';
import { IContextProps } from './IContextProps';
import { IContextValuesProps } from './IContextValuesProps';
import { IErrorProps } from '../components/Error/IErrorProps';

export const Context: React.Context<any> = createContext(undefined);

const ContextProvider = ({
	children,
	isUserLoggedIn,
	setIsUserLoggedIn
}: IContextProps) => {
	const [error, setError]: [
		IErrorProps | undefined,
		(arg: IErrorProps) => void
	] = useState<IErrorProps | undefined>(undefined);
	const [loading, setLoading]: [boolean, (arg: boolean) => void] = useState<boolean>(false);

	const handleOnChange = (
		event: ChangeEvent<HTMLInputElement>,
		setState: (arg: any) => void
	): void => {
		setState(event.target.value);
	};

	const contextValues: IContextValuesProps = {
		error,
		setError,
		loading,
		setLoading,
		handleOnChange,
		isUserLoggedIn,
		setIsUserLoggedIn
	};

	return (
		<Context.Provider
			value={contextValues}
		>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
	createContext, useState
} from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { IContextProps } from './IContextProps';
import { IContextValuesProps } from './IContextValuesProps';
import { IErrorProps } from '../components/Error/IErrorProps';

export const Context: React.Context<any> = createContext(undefined);

const ContextProvider = ({
	children,
	userToken,
	setUserToken
}: IContextProps) => {
	const [error, setError]: [
		IErrorProps | undefined,
		(arg: IErrorProps | undefined) => void
	] = useState<IErrorProps | undefined>(undefined);
	const [loading, setLoading]: [boolean, (arg: boolean) => void] = useState<boolean>(false);
	const navigate: NavigateFunction = useNavigate();

	const contextValues: IContextValuesProps = {
		error,
		setError,
		loading,
		setLoading,
		userToken,
		setUserToken,
		navigate
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
	createContext, useState
} from 'react';
import { IContextProps } from './IContextProps';
import { IContextValuesProps } from './IContextValuesProps';
import { IErrorProps } from '../components/Error/IErrorProps';

export const Context: React.Context<any> = createContext(undefined);

const ContextProvider = ({
	children
}: IContextProps) => {
	const [error, setError]: [IErrorProps | undefined, Function] = useState<IErrorProps | undefined>(undefined);
	const [loading, setLoading]: [boolean, Function] = useState<boolean>(false);

	const contextValues: IContextValuesProps = {
		error,
		setError,
		loading,
		setLoading
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

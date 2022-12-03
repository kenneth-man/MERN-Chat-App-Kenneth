import React, {
	createContext, useState
} from 'react';
import { IContextProps } from './IContextProps';
import { IErrorProps } from '../components/Error/IErrorProps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Context: React.Context<any> = createContext(null);

const ContextProvider = ({
	children
}: IContextProps) => {
	const [error, setError]: [IErrorProps | undefined, Function] = useState<IErrorProps | undefined>(undefined);
	const [loading, setLoading]: [boolean, Function] = useState<boolean>(true);

	return (
		<Context.Provider
			value={{
				error,
				setError,
				loading,
				setLoading
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

import { ReactNode } from 'react';

export interface IContextProps {
	children: ReactNode;
	userToken: string | null;
	setUserToken: (arg: string | null) => void;
}

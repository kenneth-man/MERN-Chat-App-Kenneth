import { ReactNode } from 'react';

export interface IContextProps {
	children: ReactNode;
	isUserLoggedIn: boolean;
	setIsUserLoggedIn: (arg: boolean) => void;
}

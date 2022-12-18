import { IRoutesProps } from '../../models/interfaces';

export interface IAppProps {
	isUserLoggedIn: boolean;
	setIsUserLoggedIn: (arg: boolean) => void;
	returnRoute: (arg: IRoutesProps) => JSX.Element;
}

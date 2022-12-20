import { IErrorProps } from '../components/Error/IErrorProps';

export interface IContextValuesProps {
	error: IErrorProps | undefined;
	setError: (arg: IErrorProps) => void;
	loading: boolean;
	setLoading: (arg: boolean) => void;
	isUserLoggedIn: boolean;
	setIsUserLoggedIn: (arg: boolean) => void;
}

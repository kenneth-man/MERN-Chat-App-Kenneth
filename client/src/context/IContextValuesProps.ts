import { NavigateFunction } from 'react-router-dom';
import { IErrorProps } from '../components/Error/IErrorProps';

export interface IContextValuesProps {
	error: IErrorProps | undefined;
	setError: (arg: IErrorProps | undefined) => void;
	loading: boolean;
	setLoading: (arg: boolean) => void;
	userToken: string | null;
	setUserToken: (arg: string | null) => void;
	navigate: NavigateFunction;
}

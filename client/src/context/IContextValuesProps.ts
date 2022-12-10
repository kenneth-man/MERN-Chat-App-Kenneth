import { IErrorProps } from '../components/Error/IErrorProps';

export interface IContextValuesProps {
	error: IErrorProps | undefined;
	setError: Function;
	loading: boolean;
	setLoading: Function;
}

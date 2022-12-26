import { IErrorProps } from './IErrorProps';

export interface IErrorComponentProps {
	error: IErrorProps;
	setError: (arg: IErrorProps | undefined) => void;
}

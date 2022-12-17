export interface IErrorProps {
    message: string;
    code: string;
    setError: (arg: IErrorProps) => void;
}

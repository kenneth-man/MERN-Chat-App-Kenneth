import { IErrorComponentProps } from './IErrorComponentProps';

const Error = ({
	error,
	setError
}: IErrorComponentProps): JSX.Element => (
	<div
		className="w-full h-full flex flex-col justify-evenly items-center bg-blue-700"
	>
		<h1>{error.message}</h1>
		<h2>{error.code}</h2>
		<button
			type="button"
			onClick={() => setError(undefined)}
		>
			close
		</button>
	</div>
);

export default Error;

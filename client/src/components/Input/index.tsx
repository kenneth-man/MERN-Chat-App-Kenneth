import { ChangeEvent } from 'react';
import { IInputProps } from './IInputProps';

const Input = ({
	state, setState, handleOnChange, placeholder, type,
	name, className, style
}: IInputProps): JSX.Element => (
	<input
		value={state}
		onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChange(event, setState)}
		placeholder={placeholder}
		type={type}
		name={name}
		className={`
			w-full rounded-full text-center py-1 outline-offset-0 sm:w-96
			hover:outline-4 hover:outline-cyan-500 hover:outline hover:cursor-pointer 
			focus:outline-4 focus:outline-cyan-500 focus:outline 
			${className}
		`}
		style={style}
	/>
);

export default Input;

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
			${className}
		`}
		style={style}
	/>
);

export default Input;

/* eslint-disable indent */
/* eslint-disable react/button-has-type */
import { IButtonProps } from './IButtonProps';

const Button = ({
	children, type, alt, onClick, className, style
}: IButtonProps): JSX.Element => (
	<button
		type={type}
		onClick={onClick}
		className={`
			py-2 px-4 rounded-full uppercase font-light
			hover:shadow-md hover:shadow-cyan-200 hover:-translate-y-[2.5px] hover:brightness-95
			active:shadow-none active:translate-y-0
			${
				alt
				? 'text-white bg-cyan-500 active:bg-cyan-300'
				: 'text-cyan-900 bg-white active:bg-cyan-200'
			}
			${className}
		`}
		style={style}
	>
		{children}
	</button>
);

export default Button;

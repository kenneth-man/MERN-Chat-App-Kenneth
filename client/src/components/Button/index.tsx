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
			py-2 px-4 rounded-full  uppercase font-thin
			hover:shadow-md hover:shadow-cyan-100 hover:-translate-y-[3px]
			active:shadow-none active:translate-y-0
			${alt
				? 'text-white bg-cyan-500 hover:bg-white hover:text-cyan-900'
				: 'text-cyan-900 bg-white hover:bg-cyan-500 hover:text-white'
			}
			${className}
		`}
		style={style}
	>
		{children}
	</button>
);

export default Button;

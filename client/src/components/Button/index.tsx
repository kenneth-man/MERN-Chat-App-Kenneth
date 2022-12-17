/* eslint-disable react/button-has-type */
import { IButtonProps } from './IButtonProps';

const Button = ({
	children, type, onClick, className, style
}: IButtonProps): JSX.Element => (
	<button
		type={type}
		onClick={onClick}
		className={`
			${className}
		`}
		style={style}
	>
		{children}
	</button>
);

export default Button;

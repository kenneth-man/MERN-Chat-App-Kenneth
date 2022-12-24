import { Link, NavLink } from 'react-router-dom';
import { ICommonLinkProps } from './ICommonLinkProps';

const CommonLink = ({
	children, type, url, className, style
}: ICommonLinkProps): JSX.Element => (
	<>
		{
			type === 'Anchor'
			&& (
				<a
					href={url}
					className={`
						underline decoration-transparent decoration-solid decoration-1 underline-offset-2
						hover:decoration-inherit
						${className}
					`}
					style={style}
				>
					{children}
				</a>
			)
		}
		{
			type === 'Clear'
			&& (
				<a
					href={url}
					className={`
						rounded-full
						${className}
					`}
					style={style}
				>
					{children}
				</a>
			)
		}
		{
			type === 'Link'
			&& (
				<Link
					to={url}
					className={`
						${className}
					`}
					style={style}
				>
					{children}
				</Link>
			)
		}
		{
			type === 'NavLink'
			&& (
				<NavLink
					to={url}
					className={`
						${className}
					`}
					style={style}
				>
					{children}
				</NavLink>
			)
		}
	</>
);

export default CommonLink;

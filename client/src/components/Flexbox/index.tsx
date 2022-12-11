import { IFlexBoxProps } from './IFlexBoxProps';

const FlexBox = ({
	children, flexDirection, fullWidth, fullHeight, alignItems,
	justifyContent, className, style
}: IFlexBoxProps): JSX.Element => (
	<div
		className={`
			flex
			${flexDirection || 'flex-row'}
			${fullWidth && 'w-full'}
			${fullHeight && 'h-full'}
			${alignItems || 'items-center'}
			${justifyContent}
			${className}
		`}
		style={style}
	>
		{children}
	</div>
);

export default FlexBox;

import { IFlexBoxProps } from './IFlexBoxProps';

const FlexBox = ({
	children, flexDirection, fullWidth, fullHeight, fullPageSection,
	alignItems, justifyContent, className, style
}: IFlexBoxProps): JSX.Element => (
	<div
		className={`
			flex
			${flexDirection || 'row'}
			${fullWidth && 'w-full'}
			${fullHeight && 'h-full'}
			${fullPageSection && 'min-h-full'}
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

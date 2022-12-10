import { ReactNode } from 'react';
import { FlexDirection, AlignItems, JustifyContent } from '../../models/types';
import { IStyleProps } from '../../models/interfaces';

export interface IFlexBoxProps {
	children: ReactNode;
	flexDirection?: FlexDirection;
	fullWidth?: boolean;
	fullHeight?: boolean;
	fullPageSection?: boolean;
	alignItems?: AlignItems;
	justifyContent?: JustifyContent;
	className?: string;
	style?: IStyleProps;
}

import { ReactNode } from 'react';
import { LoadingSkeleton, JustifyContent, AlignItems } from '../../models/types';

export interface IPageContainerProps {
	children: ReactNode;
	loadingSkeleton: LoadingSkeleton;
	fullWidth?: boolean;
	fullHeight?: boolean;
	justifyContent?: JustifyContent;
	alignItems?: AlignItems;
	backgroundImage?: string;
	backgroundGradient?: string;
	backgroundSize?: string;
	backgroundPosition?: string;
	backgroundAttachment?: string;
	backgroundRepeat?: string;
	className?: string;
}

import { ReactNode } from 'react';
import { IStyleProps } from '../../models/interfaces';
import { AlignItems, JustifyContent, LoadingSkeleton } from '../../models/types';
import { IErrorProps } from '../Error/IErrorProps';

export interface IPageProps {
	children: ReactNode;
	loading: boolean;
	loadingSkeleton: LoadingSkeleton;
    error: IErrorProps | undefined;
    setError: (arg: IErrorProps) => void;
	justifyContent?: JustifyContent;
	alignItems?: AlignItems;
	backgroundImage?: string;
	backgroundGradient?: string;
	backgroundSize?: string;
	backgroundPosition?: string;
	backgroundAttachment?: string;
	backgroundRepeat?: string;
	className?: string;
	style?: IStyleProps;
}

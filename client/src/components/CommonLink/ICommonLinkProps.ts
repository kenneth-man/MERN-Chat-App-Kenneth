import { ReactNode } from 'react';
import { CommonLink } from '../../models/types';
import { IStyleProps } from '../../models/interfaces';

export interface ICommonLinkProps {
	children: ReactNode
	type: CommonLink;
	url: string;
	className?: string;
	style?: IStyleProps;
}

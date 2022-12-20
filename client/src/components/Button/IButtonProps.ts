import { MouseEventHandler, ReactNode } from 'react';
import { IStyleProps } from '../../models/interfaces';
import { Button } from '../../models/types';

export interface IButtonProps {
	children: ReactNode;
	type: Button;
	alt?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	style?: IStyleProps;
}

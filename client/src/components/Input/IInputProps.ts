/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute } from 'react';
import { IStyleProps } from '../../models/interfaces';

export interface IInputProps {
	state: any;
	setState: (arg: any) => void;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	name: string;
	className?: string;
	style?: IStyleProps;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute, ChangeEvent } from 'react';
import { IStyleProps } from '../../models/interfaces';

export interface IInputProps {
	state: any;
	setState: (arg: any) => void;
	handleOnChange: (
		event: ChangeEvent<HTMLInputElement>,
		setState: (arg: any) => void
	) => void;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	name: string;
	className?: string;
	style?: IStyleProps;
}

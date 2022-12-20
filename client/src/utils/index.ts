/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';

export class Utils {
	static handleOnChange = (
		event: ChangeEvent<HTMLInputElement>,
		setState: (arg: any) => void
	): void => {
		setState(event.target.value);
	};
}

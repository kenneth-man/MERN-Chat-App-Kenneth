import { useContext } from 'react';
import { Context } from '.';
import { IContextValuesProps } from './IContextValuesProps';

export const useAppContext = (): IContextValuesProps => {
	const context: IContextValuesProps = useContext(Context);

	if (!context) {
		throw new Error('Cannot use App Context outside of a provider');
	}

	return context;
};

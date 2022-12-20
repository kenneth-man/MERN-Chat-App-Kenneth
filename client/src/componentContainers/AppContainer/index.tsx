import { useState } from 'react';
import { Route } from 'react-router-dom';
import { App } from '../../components';
import { IRoutesProps } from '../../models/interfaces';

const AppContainer = (): JSX.Element => {
	const [isUserLoggedIn, setIsUserLoggedIn]: [boolean, (arg: boolean) => void] = useState<boolean>(false);

	const returnRoute = (arg: IRoutesProps): JSX.Element => {
		const { path, pathName, Element }: IRoutesProps = arg;

		return (
			<Route
				key={pathName}
				path={path}
				element={<Element />}
			/>
		);
	};

	return (
		<App
			isUserLoggedIn={isUserLoggedIn}
			setIsUserLoggedIn={setIsUserLoggedIn}
			returnRoute={returnRoute}
		/>
	);
};

export default AppContainer;

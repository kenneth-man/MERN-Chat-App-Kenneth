/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { App } from '../../components';
import { IRoutesProps } from '../../models/interfaces';
import { routes } from '../../constants/routes';
import { filterRoutePaths } from '../../constants/filterRoutePaths';

const AppContainer = (): JSX.Element => {
	const [isUserLoggedIn, setIsUserLoggedIn]: [boolean, (arg: boolean) => void] = useState<boolean>(false);
	const [appRoutes, setAppRoutes]: [JSX.Element[], (arg: JSX.Element[]) => void] = useState<JSX.Element[]>([]);

	const returnRoute = (arg: IRoutesProps): JSX.Element => {
		const { path, pathName, Element }: IRoutesProps = arg;

		// redirect to '/' if logged in user tries to access '/Login', '/Register' or '/ForgotPassword'
		if (isUserLoggedIn && filterRoutePaths.includes(path)) {
			return (
				<Route
					key={pathName}
					path={`${path}`}
					element={(
						<Navigate
							to="/"
						/>
					)}
				/>
			);
		}

		return (
			<Route
				key={pathName}
				path={path}
				element={<Element />}
			/>
		);
	};

	const filterRoutes = (isUserLoggedIn: boolean): JSX.Element[] => {
		let routeData: IRoutesProps[] = routes;

		if (!isUserLoggedIn) {
			routeData = routes.filter(
				(curr: IRoutesProps) => filterRoutePaths.some(
					(path: string) => path === curr.path
				)
			);
		}

		const routeElements: JSX.Element[] = routeData.map((curr: IRoutesProps) => returnRoute(curr));

		// redirect to '/Login' if a non logged in user tries to access any page other than
		// '/Login', '/Register' or '/ForgotPassword'
		if (!isUserLoggedIn) {
			routeElements.push(
				<Route
					key="Redirect"
					path="*"
					element={(
						<Navigate
							to="/Login"
						/>
					)}
				/>
			);
		}

		return routeElements;
	};

	useEffect(() => {
		setAppRoutes(filterRoutes(isUserLoggedIn));
	}, [isUserLoggedIn]);

	return (
		<App
			isUserLoggedIn={isUserLoggedIn}
			setIsUserLoggedIn={setIsUserLoggedIn}
			appRoutes={appRoutes}
		/>
	);
};

export default AppContainer;

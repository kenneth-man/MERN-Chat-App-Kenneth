/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { App } from '../../components';
import { IRoutesProps } from '../../models/interfaces';
import { routes } from '../../constants/routes';
import { filterRoutePaths } from '../../constants/filterRoutePaths';

const AppContainer = (): JSX.Element => {
	// if 'userToken' property doesn't exist in localStorage, the user is not logged in
	const [userToken, setUserToken]: [
		string | null,
		(arg: string | null) => void
	] = useState<string | null>(window.localStorage.getItem('userToken'));
	const [appRoutes, setAppRoutes]: [JSX.Element[], (arg: JSX.Element[]) => void] = useState<JSX.Element[]>([]);

	const returnRoute = (arg: IRoutesProps): JSX.Element => {
		const { path, pathName, Element }: IRoutesProps = arg;

		// redirect to '/' if logged in user tries to access '/Login', '/Register' or '/ForgotPassword'
		if (userToken && filterRoutePaths.includes(path)) {
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

	const filterRoutes = (userToken: string | null): JSX.Element[] => {
		let routeData: IRoutesProps[] = routes;

		if (!userToken) {
			routeData = routes.filter(
				(curr: IRoutesProps) => filterRoutePaths.some(
					(path: string) => path === curr.path
				)
			);
		}

		const routeElements: JSX.Element[] = routeData.map((curr: IRoutesProps) => returnRoute(curr));

		// redirect to '/Login' if a non logged in user tries to access any page other than
		// '/Login', '/Register' or '/ForgotPassword'
		if (!userToken) {
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
		setAppRoutes(filterRoutes(userToken));
	}, [userToken]);

	return (
		<App
			userToken={userToken}
			setUserToken={setUserToken}
			appRoutes={appRoutes}
		/>
	);
};

export default AppContainer;

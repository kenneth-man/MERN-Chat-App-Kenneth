/* eslint-disable import/no-cycle */
import {
	BrowserRouter, Routes, Route, Navigate
} from 'react-router-dom';
import ContextProvider from '../../context';
import { routes } from '../../constants/routes';
import { IRoutesProps } from '../../models/interfaces';
import { FlexBox } from '..';
import { IAppProps } from './IAppProps';

const App = ({
	isUserLoggedIn,
	setIsUserLoggedIn,
	returnRoute
}: IAppProps): JSX.Element => (
	<FlexBox
		flexDirection="flex-col"
		fullWidth
		fullHeight
	>
		<BrowserRouter>
			<ContextProvider
				isUserLoggedIn={isUserLoggedIn}
				setIsUserLoggedIn={setIsUserLoggedIn}
			>
				<Routes>
					{
						isUserLoggedIn
							? (
								routes.map((curr: IRoutesProps) => returnRoute(curr))
							) : (
								routes
									.filter((curr: IRoutesProps) => (
										curr.path === '/Login'
										|| curr.path === '/Register'
										|| curr.path === '/ForgotPassword'
									))
									.map((curr: IRoutesProps) => returnRoute(curr))
							)
					}
					{
						!isUserLoggedIn
						&& (
							<Route
								path="*"
								element={(
									<Navigate
										to="/Login"
									/>
								)}
							/>
						)
					}
				</Routes>
			</ContextProvider>
		</BrowserRouter>
	</FlexBox>
);

export default App;

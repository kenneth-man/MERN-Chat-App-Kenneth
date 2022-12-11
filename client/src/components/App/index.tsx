/* eslint-disable import/no-cycle */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContextProvider from '../../context';
import { routes } from '../../constants/routes';
import { IRoutesProps } from '../../models/interfaces';
import { FlexBox } from '..';

const App = (): JSX.Element => (
	<FlexBox
		flexDirection="flex-col"
		fullWidth
		fullHeight
	>
		<BrowserRouter>
			<ContextProvider>
				<Routes>
					{
						routes.map((curr: IRoutesProps) => {
							const { path, pathName, Element }: IRoutesProps = curr;

							return (
								<Route
									key={pathName}
									path={path}
									element={<Element />}
								/>
							);
						})
					}
				</Routes>
			</ContextProvider>
		</BrowserRouter>
	</FlexBox>
);

export default App;

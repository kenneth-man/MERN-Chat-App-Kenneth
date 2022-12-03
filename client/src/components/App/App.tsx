import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContextProvider from '../../context';
import { routes } from '../../constants/routes';
import { IRoutesProps } from '../../models/interfaces';

const App = (): JSX.Element => (
	<div
		className="flex flex-col"
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
	</div>
);

export default App;

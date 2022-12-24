import { BrowserRouter, Routes } from 'react-router-dom';
import ContextProvider from '../../context';
import { FlexBox } from '..';
import { IAppProps } from './IAppProps';
import backgroundImage from '../../res/images/gradient-1.png';

const App = ({
	isUserLoggedIn,
	setIsUserLoggedIn,
	appRoutes
}: IAppProps): JSX.Element => (
	<FlexBox
		flexDirection="flex-col"
		fullWidth
		fullHeight
		style={{
			backgroundImage: `url(${backgroundImage})`
		}}
	>
		<BrowserRouter>
			<ContextProvider
				isUserLoggedIn={isUserLoggedIn}
				setIsUserLoggedIn={setIsUserLoggedIn}
			>
				<Routes>
					{appRoutes}
				</Routes>
			</ContextProvider>
		</BrowserRouter>
	</FlexBox>
);

export default App;

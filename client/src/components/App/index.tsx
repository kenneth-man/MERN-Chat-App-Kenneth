import { BrowserRouter, Routes } from 'react-router-dom';
import ContextProvider from '../../context';
import { FlexBox } from '..';
import { IAppProps } from './IAppProps';
import backgroundImage from '../../res/images/gradient-1.png';

const App = ({
	userToken,
	setUserToken,
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
				userToken={userToken}
				setUserToken={setUserToken}
			>
				<Routes>
					{appRoutes}
				</Routes>
			</ContextProvider>
		</BrowserRouter>
	</FlexBox>
);

export default App;

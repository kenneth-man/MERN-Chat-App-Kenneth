import { StrictMode } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { AppContainer } from './componentContainers';
import './index.css';

const root: Root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<StrictMode>
		<AppContainer />
	</StrictMode>
);

import { StrictMode } from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import { App } from './components';
import './index.css';

const root: Root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

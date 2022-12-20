import { useState } from 'react';
import { Login } from '../../pages';

const LoginContainer = (): JSX.Element => {
	const [loginEmail, setLoginEmail]: [string, (arg: string) => void] = useState<string>('');
	const [loginPassword, setLoginPassword]: [string, (arg: string) => void] = useState<string>('');

	return (
		<Login
			loginEmail={loginEmail}
			setLoginEmail={setLoginEmail}
			loginPassword={loginPassword}
			setLoginPassword={setLoginPassword}
		/>
	);
};

export default LoginContainer;

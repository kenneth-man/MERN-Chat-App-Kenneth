import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { IContextValuesProps } from '../../context/IContextValuesProps';
import { Login } from '../../pages';

const LoginContainer = (): JSX.Element => {
	const { handleOnChange }: IContextValuesProps = useAppContext();
	const [loginEmail, setLoginEmail]: [string, (arg: string) => void] = useState<string>('');
	const [loginPassword, setLoginPassword]: [string, (arg: string) => void] = useState<string>('');

	return (
		<Login
			loginEmail={loginEmail}
			setLoginEmail={setLoginEmail}
			loginPassword={loginPassword}
			setLoginPassword={setLoginPassword}
			handleOnChange={handleOnChange}
		/>
	);
};

export default LoginContainer;

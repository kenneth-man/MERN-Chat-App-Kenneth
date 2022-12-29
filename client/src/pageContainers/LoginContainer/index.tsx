/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { IContextValuesProps } from '../../context/IContextValuesProps';
import { Login } from '../../pages';
import { Utils } from '../../utils';

const LoginContainer = (): JSX.Element => {
	const {
		setLoading, setError, setUserToken, navigate
	}: IContextValuesProps = useAppContext();
	const [loginEmail, setLoginEmail]: [string, (arg: string) => void] = useState<string>('');
	const [loginPassword, setLoginPassword]: [string, (arg: string) => void] = useState<string>('');

	const handleLoginOnSubmit = async (): Promise<void> => {
		try {
			setLoading(true);

			const response: any = await axios({
				method: 'post',
				url: '/api/v1/users/login',
				data: {
					email: loginEmail,
					password: loginPassword
				}
			});

			Utils.handleUpdateToken(response.data.token, setUserToken);

			navigate('/');

			setLoading(false);
		} catch (error: any) {
			Utils.handleError(
				{
					message: error.response.data.message,
					code: error.response.status
				},
				setError,
				setLoading,
				[
					setLoginEmail,
					setLoginPassword
				]
			);
		}
	};

	return (
		<Login
			loginEmail={loginEmail}
			setLoginEmail={setLoginEmail}
			loginPassword={loginPassword}
			setLoginPassword={setLoginPassword}
			handleLoginOnSubmit={handleLoginOnSubmit}
		/>
	);
};

export default LoginContainer;

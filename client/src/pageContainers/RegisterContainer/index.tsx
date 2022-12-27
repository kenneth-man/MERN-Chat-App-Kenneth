/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { IContextValuesProps } from '../../context/IContextValuesProps';
import { Register } from '../../pages';
import { Utils } from '../../utils';

const RegisterContainer = (): JSX.Element => {
	const {
		setError, setLoading, navigate, setUserToken
	}: IContextValuesProps = useAppContext();
	const [registerName, setRegisterName]: [string, (arg: string) => void] = useState<string>('');
	const [registerEmail, setRegisterEmail]: [string, (arg: string) => void] = useState<string>('');
	const [registerPassword, setRegisterPassword]: [string, (arg: string) => void] = useState<string>('');
	const [registerPasswordConfirm, setRegisterPasswordConfirm]: [string, (arg: string) => void] = useState<string>('');

	const handleSignupOnSubmit = async (): Promise<void> => {
		try {
			setLoading(true);

			const response: any = await axios({
				method: 'post',
				url: '/api/v1/users/signup',
				data: {
					name: registerName,
					email: registerEmail,
					password: registerPassword,
					passwordConfirm: registerPasswordConfirm
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
					setRegisterName,
					setRegisterEmail,
					setRegisterPassword,
					setRegisterPasswordConfirm
				]
			);
		}
	};

	return (
		<Register
			registerName={registerName}
			setRegisterName={setRegisterName}
			registerEmail={registerEmail}
			setRegisterEmail={setRegisterEmail}
			registerPassword={registerPassword}
			setRegisterPassword={setRegisterPassword}
			registerPasswordConfirm={registerPasswordConfirm}
			setRegisterPasswordConfirm={setRegisterPasswordConfirm}
			handleSignupOnSubmit={handleSignupOnSubmit}
		/>
	);
};

export default RegisterContainer;

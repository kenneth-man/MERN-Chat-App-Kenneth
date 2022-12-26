/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { IContextValuesProps } from '../../context/IContextValuesProps';
import { Register } from '../../pages';
import { Utils } from '../../utils';

const RegisterContainer = (): JSX.Element => {
	const { setError, setLoading }: IContextValuesProps = useAppContext();
	const [registerName, setRegisterName]: [string, (arg: string) => void] = useState<string>('');
	const [registerEmail, setRegisterEmail]: [string, (arg: string) => void] = useState<string>('');
	const [registerPassword, setRegisterPassword]: [string, (arg: string) => void] = useState<string>('');
	const [registerPasswordConfirm, setRegisterPasswordConfirm]: [string, (arg: string) => void] = useState<string>('');

	const handleSignupOnSubmit = async (): Promise<void> => {
		try {
			setLoading(true);

			await axios({
				method: 'post',
				url: '/api/v1/users/signup',
				data: {
					name: registerName,
					email: registerEmail,
					password: registerPassword,
					passwordConfirm: registerPasswordConfirm
				}
			});

			setLoading(false);
		} catch (error: any) {
			Utils.handleError(
				{
					message: error.message,
					code: error.code
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
			console.log(error);
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

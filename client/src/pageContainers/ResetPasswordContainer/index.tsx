/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useParams, Params } from 'react-router-dom';
import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { IContextValuesProps } from '../../context/IContextValuesProps';
import { ResetPassword } from '../../pages';
import { Utils } from '../../utils';

const ResetPasswordContainer = (): JSX.Element => {
	const { setUserToken, setError, setLoading }: IContextValuesProps = useAppContext();
	const { token }: Readonly<Params<string>> = useParams();
	const [password, setPassword]: [string, (arg: string) => void] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm]: [string, (arg: string) => void] = useState<string>('');

	const handleSubmitResetPassword = async (): Promise<void> => {
		try {
			if (token) {
				setLoading(true);

				await axios({
					method: 'patch',
					url: `/api/v1/users/resetPassword/${token}`
				});

				Utils.handleUpdateToken(token, setUserToken);

				setLoading(false);
			}
		} catch (error: any) {
			Utils.handleError(
				{
					message: error.response.data.message,
					code: error.response.status
				},
				setError,
				setLoading,
				[
					setPassword,
					setPasswordConfirm
				]
			);
		}
	};

	return (
		<ResetPassword />
	);
};

export default ResetPasswordContainer;

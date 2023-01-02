/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { IContextValuesProps } from '../../context/IContextValuesProps';
import { ForgotPassword } from '../../pages';
import { Utils } from '../../utils';

const ForgotPasswordContainer = (): JSX.Element => {
	const { setError, setLoading }: IContextValuesProps = useAppContext();
	const [sendingEmail, setSendingEmail]: [string, (arg: string) => void] = useState<string>('');
	// eslint-disable-next-line no-unused-vars
	const [emailSent, setEmailSent]: [boolean, (arg: boolean) => void] = useState<boolean>(false);

	const handleEmailSend = async (): Promise<void> => {
		try {
			setLoading(true);

			await axios({
				method: 'post',
				url: '/api/v1/users/forgotPassword',
				data: {
					email: sendingEmail
				}
			});

			setEmailSent(true);

			setLoading(false);
		} catch (error: any) {
			Utils.handleError(
				{
					message: error.response.data.message,
					code: error.response.status
				},
				setError,
				setLoading,
				[setSendingEmail]
			);

			setEmailSent(false);
		}
	};

	return (
		<ForgotPassword
			sendingEmail={sendingEmail}
			setSendingEmail={setSendingEmail}
			emailSent={emailSent}
			handleEmailSend={handleEmailSend}
		/>
	);
};

export default ForgotPasswordContainer;

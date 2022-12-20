import { useState } from 'react';
import { ForgotPassword } from '../../pages';

const ForgotPasswordContainer = (): JSX.Element => {
	const [sendingEmail, setSendingEmail]: [string, (arg: string) => void] = useState<string>('');
	// eslint-disable-next-line no-unused-vars
	const [emailSent, setEmailSent]: [boolean, (arg: boolean) => void] = useState<boolean>(false);

	return (
		<ForgotPassword
			sendingEmail={sendingEmail}
			setSendingEmail={setSendingEmail}
			emailSent={emailSent}
		/>
	);
};

export default ForgotPasswordContainer;

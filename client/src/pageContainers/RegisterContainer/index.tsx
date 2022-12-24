import { useState } from 'react';
import { Register } from '../../pages';

const RegisterContainer = (): JSX.Element => {
	const [registerEmail, setRegisterEmail]: [string, (arg: string) => void] = useState<string>('');
	const [registerPassword, setRegisterPassword]: [string, (arg: string) => void] = useState<string>('');
	const [registerPasswordConfirm, setRegisterPasswordConfirm]: [string, (arg: string) => void] = useState<string>('');

	return (
		<Register
			registerEmail={registerEmail}
			setRegisterEmail={setRegisterEmail}
			registerPassword={registerPassword}
			setRegisterPassword={setRegisterPassword}
			registerPasswordConfirm={registerPasswordConfirm}
			setRegisterPasswordConfirm={setRegisterPasswordConfirm}
		/>
	);
};

export default RegisterContainer;

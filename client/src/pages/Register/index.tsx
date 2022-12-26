/* eslint-disable jsx-a11y/label-has-associated-control */
import { PageContainer } from '../../componentContainers';
import { FlexBox, Input, Button } from '../../components';
import { IRegisterProps } from './IRegisterProps';
import backgroundImage from '../../res/images/gradient-3.jpg';

const Register = ({
	registerName,
	setRegisterName,
	registerEmail,
	setRegisterEmail,
	registerPassword,
	setRegisterPassword,
	registerPasswordConfirm,
	setRegisterPasswordConfirm,
	handleSignupOnSubmit
}: IRegisterProps): JSX.Element => (
	<PageContainer
		loadingSkeleton="Generic"
		backgroundImage={backgroundImage}
		backgroundGradient="none"
		className="py-28 space-y-24"
	>
		<FlexBox
			flexDirection="flex-col"
			className="space-y-4"
		>
			<h1>
				Register a New Account!
			</h1>
			<h2>
				Please enter the email address for your new account
				with a password of length 8 or more...
			</h2>
		</FlexBox>
		<form
			className="space-y-14 w-full flex flex-col items-center"
			onSubmit={handleSignupOnSubmit}
		>
			<FlexBox
				flexDirection="flex-col"
				className="space-y-2"
			>
				<label
					htmlFor="Name Register"
				>
					Name
				</label>
				<Input
					state={registerName}
					setState={setRegisterName}
					placeholder="Please enter your username..."
					type="text"
					name="Name Register"
				/>
			</FlexBox>
			<FlexBox
				flexDirection="flex-col"
				className="space-y-2"
			>
				<label
					htmlFor="Email Register"
				>
					Email Address
				</label>
				<Input
					state={registerEmail}
					setState={setRegisterEmail}
					placeholder="Please enter your email address..."
					type="text"
					name="Email Register"
				/>
			</FlexBox>
			<FlexBox
				flexDirection="flex-col"
				className="space-y-2"
			>
				<label
					htmlFor="Password Register"
				>
					Password
				</label>
				<Input
					state={registerPassword}
					setState={setRegisterPassword}
					placeholder="Please enter your password..."
					type="password"
					name="Password Register"
				/>
			</FlexBox>
			<FlexBox
				flexDirection="flex-col"
				className="space-y-2"
			>
				<label
					htmlFor="Password Register Confirm"
				>
					Confirm your Password
				</label>
				<Input
					state={registerPasswordConfirm}
					setState={setRegisterPasswordConfirm}
					placeholder="Please re-enter your password..."
					type="password"
					name="Password Register Confirm"
				/>
			</FlexBox>
			<Button
				type="submit"
				className="text-white"
			>
				Register
			</Button>
		</form>
	</PageContainer>
);

export default Register;

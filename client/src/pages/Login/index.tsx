/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
import { PageContainer } from '../../componentContainers';
import {
	FlexBox, Input, Button, CommonLink
} from '../../components';
import { ILoginProps } from './ILoginProps';

const Login = ({
	loginEmail, setLoginEmail, loginPassword, setLoginPassword, handleOnChange
}: ILoginProps): JSX.Element => (
	<PageContainer
		loadingSkeleton="Generic"
	>
		<FlexBox>
			<h1>MERN Chat App</h1>
			<h2>World</h2>
		</FlexBox>
		<form>
			<h1>Log into your existing account</h1>
			<FlexBox>
				<label
					htmlFor="Email Login"
				>
					Email Address
				</label>
				<Input
					state={loginEmail}
					setState={setLoginEmail}
					handleOnChange={handleOnChange}
					placeholder="Please enter your email address..."
					type="text"
					name="Email Login"
				/>
			</FlexBox>
			<FlexBox>
				<label
					htmlFor="Password Login"
				>
					Password
				</label>
				<Input
					state={loginPassword}
					setState={setLoginPassword}
					handleOnChange={handleOnChange}
					placeholder="Please enter your password..."
					type="password"
					name="Password Login"
				/>
			</FlexBox>
			<FlexBox>
				<Button
					type="button"
				>
					Log In
				</Button>
				<Button
					type="submit"
				>
					Forgot Password
				</Button>
			</FlexBox>
		</form>
		<CommonLink
			type="Anchor"
			url="/ForgotPassword"
		>
			Don&apos;t already have an account? Register here!
		</CommonLink>
	</PageContainer>
);

export default Login;

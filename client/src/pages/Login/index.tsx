/* eslint-disable jsx-a11y/label-has-associated-control */
import { PageContainer } from '../../componentContainers';
import {
	FlexBox, Input, Button, CommonLink
} from '../../components';
import { ILoginProps } from './ILoginProps';
import backgroundImage from '../../res/images/gradient-1.png';

const Login = ({
	loginEmail, setLoginEmail, loginPassword, setLoginPassword, handleLoginOnSubmit
}: ILoginProps): JSX.Element => (
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
				MERN Chat App
			</h1>
			<h2>
				A Chat app created with MongoDB, Express, React and NodeJs and much more...
			</h2>
		</FlexBox>
		<form
			className="space-y-14 w-full"
			onSubmit={handleLoginOnSubmit}
		>
			<h2>Log into your existing account below &#128526;</h2>
			<FlexBox
				flexDirection="flex-col"
				className="space-y-2"
			>
				<label
					htmlFor="Email Login"
				>
					Email Address
				</label>
				<Input
					state={loginEmail}
					setState={setLoginEmail}
					placeholder="Please enter your email address..."
					type="text"
					name="Email Login"
				/>
			</FlexBox>
			<FlexBox
				flexDirection="flex-col"
				className="space-y-2"
			>
				<label
					htmlFor="Password Login"
				>
					Password
				</label>
				<Input
					state={loginPassword}
					setState={setLoginPassword}
					placeholder="Please enter your password..."
					type="password"
					name="Password Login"
				/>
			</FlexBox>
			<FlexBox
				flexDirection="flex-col"
				className="space-y-4"
			>
				<Button
					type="submit"
					className="text-white"
				>
					Log In
				</Button>
				<CommonLink
					type="Clear"
					url="/ForgotPassword"
				>
					<Button
						type="button"
						className="text-white"
						alt
					>
						Forgot Password
					</Button>
				</CommonLink>
			</FlexBox>
		</form>
		<CommonLink
			type="Anchor"
			url="/Register"
			className="text-white"
		>
			Don&apos;t already have an account? Register here!
		</CommonLink>
	</PageContainer>
);

export default Login;

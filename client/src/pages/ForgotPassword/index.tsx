/* eslint-disable jsx-a11y/label-has-associated-control */
import { PageContainer } from '../../componentContainers';
import { FlexBox, Input, Button } from '../../components';
import { IForgotPassword } from './IForgotPassword';
import backgroundImage from '../../res/images/gradient-2.png';

const ForgotPassword = ({
	sendingEmail,
	setSendingEmail,
	emailSent
}: IForgotPassword): JSX.Element => (
	<PageContainer
		justifyContent="justify-center"
		loadingSkeleton="Generic"
		backgroundImage={backgroundImage}
		backgroundGradient="none"
		className="py-64"
	>
		{
			emailSent
				? (
					<h1>sent password reset email</h1>
				) : (
					<FlexBox
						flexDirection="flex-col"
						className="space-y-20"
					>
						<FlexBox
							flexDirection="flex-col"
							className="space-y-4"
						>
							<h1>
								Forgot your password?
							</h1>
							<h2>
								Please enter the email address you&apos;d like
								your password reset information to be sent to...
							</h2>
						</FlexBox>
						<FlexBox
							flexDirection="flex-col"
							className="space-y-4"
						>
							<label
								htmlFor="Forgot Password Email"
							>
								Email Address
							</label>
							<Input
								state={sendingEmail}
								setState={setSendingEmail}
								placeholder="Please enter your email address..."
								type="text"
								name="Forgot Password Email"
							/>
							<Button
								type="button"
								className="text-white"
							>
								Send token
							</Button>
						</FlexBox>
					</FlexBox>
				)
		}
	</PageContainer>
);

export default ForgotPassword;

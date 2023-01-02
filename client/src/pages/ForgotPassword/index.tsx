/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { PageContainer } from '../../componentContainers';
import { FlexBox, Input, Button } from '../../components';
import { IForgotPassword } from './IForgotPassword';
import backgroundImage from '../../res/images/gradient-2.png';

const ForgotPassword = ({
	sendingEmail,
	setSendingEmail,
	emailSent,
	handleEmailSend
}: IForgotPassword): JSX.Element => (
	<PageContainer
		justifyContent="justify-center"
		loadingSkeleton="Generic"
		backgroundImage={backgroundImage}
		backgroundGradient="none"
		className="py-64"
	>
		<FlexBox
			flexDirection="flex-col"
			className="space-y-20"
		>
			{
				emailSent
					? (
						<>
							<h1>
								Email Sent!
							</h1>
							<h2>
								Please check your email&apos;s inbox for instructions on
								how to reset your account&apos;s password
								<br />
								The email was sent to <strong>{sendingEmail}</strong>
							</h2>
						</>
					) : (
						<>
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
									onClick={handleEmailSend}
								>
									Send token
								</Button>
							</FlexBox>
						</>
					)
			}
		</FlexBox>
	</PageContainer>
);

export default ForgotPassword;

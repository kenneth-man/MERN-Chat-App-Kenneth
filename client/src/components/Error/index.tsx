import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { FlexBox, Button } from '..';
import { IErrorComponentProps } from './IErrorComponentProps';

const Error = ({
	error,
	setError
}: IErrorComponentProps): JSX.Element => (
	<FlexBox
		flexDirection="flex-col"
		fullHeight
		fullWidth
		alignItems="items-center"
		justifyContent="justify-center"
		className="absolute top-0 left-0 bg-black/75"
	>
		<FlexBox
			flexDirection="flex-col"
			className="space-y-10"
		>
			<SentimentVeryDissatisfiedIcon
				sx={{
					color: 'white',
					fontSize: '10rem'
				}}
			/>
			<h1>
				Status Code:
				&nbsp;
				{error.code}
			</h1>
			<h2>{error.message}</h2>
			<Button
				type="button"
				onClick={() => setError(undefined)}
			>
				Close
			</Button>
		</FlexBox>
	</FlexBox>
);

export default Error;

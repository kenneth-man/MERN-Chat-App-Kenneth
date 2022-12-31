import {
	Skeleton, Stack
} from '@mui/material';
import { FeedSkeleton, FlexBox } from '..';

const GenericSkeleton = (): JSX.Element => (
	<Stack
		width="100%"
		className="absolute top-0 left-0 space-y-20"
	>
		<Skeleton
			variant="rectangular"
			width="100%"
			height={60}
		/>
		<FlexBox
			flexDirection="flex-row"
			fullWidth
			justifyContent="justify-evenly"
			className="flex-wrap"
		>
			{
				Array.from(Array(12)).map(() => (
					<FeedSkeleton
						className="mx-10 mb-20"
					/>
				))
			}
		</FlexBox>
	</Stack>
);

export default GenericSkeleton;

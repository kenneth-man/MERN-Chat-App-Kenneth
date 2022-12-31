import {
	Skeleton, Stack
} from '@mui/material';
import { FeedSkeleton, FlexBox } from '..';

const ChannelFeedSkeleton = (): JSX.Element => (
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
			flexDirection="flex-col"
			fullWidth
			className="space-y-10 px-10 pb-10"
		>
			<Skeleton
				variant="rounded"
				height={60}
				className="w-full sm:w-[35rem]"
			/>
			{
				Array.from(Array(12)).map(() => (
					<FeedSkeleton />
				))
			}
		</FlexBox>
	</Stack>
);

export default ChannelFeedSkeleton;

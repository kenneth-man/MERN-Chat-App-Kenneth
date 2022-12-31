import {
	Skeleton, Stack
} from '@mui/material';
import { ChatSkeleton, FlexBox } from '..';

const ChannelChatSkeleton = (): JSX.Element => (
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
			className="space-y-32 px-10 pb-10"
		>
			{
				Array.from(Array(12)).map((_: number, index: number) => (
					<ChatSkeleton
						variant={index % 2 === 0 ? 'Left' : 'Right'}
					/>
				))
			}
		</FlexBox>
	</Stack>
);

export default ChannelChatSkeleton;

import {
	Skeleton, Stack
} from '@mui/material';
import { FlexBox } from '..';
import { IChatSkeletonProps } from './IChatSkeletonProps';

const ChatSkeleton = ({
	variant,
	className
}: IChatSkeletonProps): JSX.Element => (
	<Stack
		direction="row"
		spacing={2}
		className={`
			${variant === 'Left' ? 'self-start' : 'self-end'}
			w-full sm:w-max
			${className}
		`}
	>
		{
			variant === 'Left'
			&& (
				<FlexBox
					className="space-x-4 w-full sm:w-max"
				>
					<Skeleton
						variant="rounded"
						className="w-full !h-20 sm:w-96"
					/>
					<Skeleton
						variant="circular"
						className="min-w-[3rem] w-12 !h-12"
					/>
				</FlexBox>
			)
		}
		{
			variant === 'Right'
			&& (
				<FlexBox
					className="space-x-4 w-full sm:w-max"
				>
					<Skeleton
						variant="circular"
						className="min-w-[3rem] w-12 !h-12"
					/>
					<Skeleton
						variant="rounded"
						className="w-full !h-20 sm:w-96"
					/>
				</FlexBox>
			)
		}
	</Stack>
);

export default ChatSkeleton;

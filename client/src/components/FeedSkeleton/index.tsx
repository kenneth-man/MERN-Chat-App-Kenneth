import {
	Skeleton, Stack
} from '@mui/material';
import { IFeedSkeletonProps } from './IFeedSkeletonProps';

const FeedSkeleton = ({
	className
}: IFeedSkeletonProps): JSX.Element => (
	<Stack
		spacing={2}
		className={`
			w-full sm:w-max
			${className}
		`}
	>
		<Skeleton
			variant="rounded"
			className="w-full !h-52 sm:w-96"
		/>
		<Stack
			direction="row"
			spacing={2}
			className="w-full sm:w-max"
		>
			<Skeleton
				variant="circular"
				className="min-w-[3rem] w-12 !h-12"
			/>
			<Stack
				spacing={1}
				className="w-full sm:w-max"
			>
				<Skeleton
					variant="rounded"
					className="w-4/5 sm:w-64"
				/>
				<Skeleton
					variant="rounded"
					className="w-3/5 sm:w-48"
				/>
			</Stack>
		</Stack>
	</Stack>
);

export default FeedSkeleton;

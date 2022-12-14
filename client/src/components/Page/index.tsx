import {
	FlexBox, Error, ChannelChatSkeleton, ChannelFeedSkeleton, GenericSkeleton
} from '..';
import { IPageProps } from './IPageProps';

const Page = ({
	children, loading, loadingSkeleton, error, setError,
	justifyContent, alignItems, backgroundImage, backgroundGradient, backgroundSize,
	backgroundPosition, backgroundAttachment, backgroundRepeat, className
}: IPageProps): JSX.Element => (
	<FlexBox
		flexDirection="flex-col"
		fullWidth
		justifyContent={justifyContent}
		alignItems={alignItems}
		className={`
			flex-1 overflow-y-scroll px-4 relative
			${className}
		`}
		style={{
			backgroundImage: backgroundGradient === 'none'
				? `url(${backgroundImage})`
				: `
					linear-gradient(
						${backgroundGradient || 'to bottom right, rgba(0,0,0,1), rgba(0,0,0,0.85)'}
					),
					url(${backgroundImage})
				`,
			backgroundSize: backgroundSize || 'cover',
			backgroundPosition: backgroundPosition || 'center',
			backgroundAttachment: backgroundAttachment || 'scroll',
			backgroundRepeat: backgroundRepeat || 'no-repeat'
		}}
	>
		{
			error && !loading
			&& (
				<Error
					error={error}
					setError={setError}
				/>
			)
		}
		{
			loading && loadingSkeleton === 'ChannelChat'
			&& (
				<ChannelChatSkeleton />
			)
		}
		{
			loading && loadingSkeleton === 'ChannelFeed'
			&& (
				<ChannelFeedSkeleton />
			)
		}
		{
			loading && loadingSkeleton === 'Generic'
			&& (
				<GenericSkeleton />
			)
		}
		{
			!error && !loading
			&& children
		}
	</FlexBox>
);

export default Page;

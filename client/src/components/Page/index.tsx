/* eslint-disable import/no-cycle */
import {
	FlexBox, Error, ChannelSkeleton, GenericSkeleton
} from '..';
import { IPageProps } from './IPageProps';

const Page = ({
	// eslint-disable-next-line no-unused-vars
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
			flex-1 overflow-y-scroll
			${className}
		`}
		style={{
			backgroundImage: `
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
				<Error />
			)
		}
		{
			loading && loadingSkeleton === 'Channel'
			&& (
				<ChannelSkeleton />
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

/* eslint-disable import/no-cycle */
import {
	FlexBox, Error, ChannelSkeleton, GenericSkeleton
} from '..';
import { IPageProps } from './IPageProps';

const Page = ({
	// eslint-disable-next-line no-unused-vars
	children, loading, loadingSkeleton, error, setError,
	fullWidth, fullHeight, justifyContent, alignItems, backgroundImage,
	backgroundGradient, backgroundSize, backgroundPosition, backgroundAttachment,
	backgroundRepeat, className
}: IPageProps): JSX.Element => (
	<FlexBox
		fullWidth={fullWidth}
		fullHeight={fullHeight}
		justifyContent={justifyContent}
		alignItems={alignItems}
		className={className}
		style={{
			backgroundImage: `
				linear-gradient(
					${backgroundGradient || 'rgba(0,0,0,0.5), rgba(0,0,0,0.5)'}
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

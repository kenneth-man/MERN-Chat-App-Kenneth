/* eslint-disable import/no-cycle */
import { IContextValuesProps } from '../../context/IContextValuesProps';
import { useAppContext } from '../../context/useAppContext';
import { Page } from '../../components';
import { IPageContainerProps } from './IPageContainerProps';

const PageContainer = ({
	children, loadingSkeleton, justifyContent, alignItems, backgroundImage,
	backgroundGradient, backgroundSize, backgroundPosition, backgroundAttachment, backgroundRepeat,
	className
}: IPageContainerProps): JSX.Element => {
	const { loading, error, setError }: IContextValuesProps = useAppContext();

	return (
		<Page
			loading={loading}
			loadingSkeleton={loadingSkeleton}
			error={error}
			setError={setError}
			justifyContent={justifyContent}
			alignItems={alignItems}
			backgroundImage={backgroundImage}
			backgroundGradient={backgroundGradient}
			backgroundSize={backgroundSize}
			backgroundPosition={backgroundPosition}
			backgroundAttachment={backgroundAttachment}
			backgroundRepeat={backgroundRepeat}
			className={className}
		>
			{children}
		</Page>
	);
};

export default PageContainer;

import { useAppContext } from '../../context/useAppContext';
import { IContextValuesProps } from '../../context/IContextValuesProps';
import { PageContainer } from '../../componentContainers';
import { Utils } from '../../utils';

const Home = (): JSX.Element => {
	const { setUserToken }: IContextValuesProps = useAppContext();

	return (
		<PageContainer
			loadingSkeleton="Generic"
			backgroundGradient="none"
		>
			Home
			<button
				type="button"
				className="bg-black text-white"
				onClick={() => Utils.handleUpdateToken(null, setUserToken)}
			>
				SIGNOUT (temp)
			</button>
		</PageContainer>
	);
};

export default Home;

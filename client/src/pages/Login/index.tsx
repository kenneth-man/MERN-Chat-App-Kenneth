/* eslint-disable import/no-cycle */
import { PageContainer } from '../../componentContainers';

const Login = (): JSX.Element => (
	<PageContainer
		loadingSkeleton="Generic"
	>
		<h1>Hello</h1>
		<h2>World</h2>
	</PageContainer>
);

export default Login;

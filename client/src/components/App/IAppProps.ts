export interface IAppProps {
	userToken: string | null;
	setUserToken: (arg: string | null) => void;
	appRoutes: JSX.Element[];
}

export interface IAppProps {
	isUserLoggedIn: boolean;
	setIsUserLoggedIn: (arg: boolean) => void;
	appRoutes: JSX.Element[];
}

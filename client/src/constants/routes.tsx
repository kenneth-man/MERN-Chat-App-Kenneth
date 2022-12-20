import { IRoutesProps } from '../models/interfaces';
import {
	ForgotPasswordContainer, LoginContainer, RegisterContainer
} from '../pageContainers';
import {
	Error404, GlobalChat, GlobalFeed, Home, NearMe,
	PrivateChat, PrivateChats, PrivateFeed, Profile
} from '../pages';

export const routes: IRoutesProps[] = [
	{
		path: '/',
		pathName: 'Home',
		Element: Home
	},
	{
		path: '/Login',
		pathName: 'Login',
		Element: LoginContainer
	},
	{
		path: '/Register',
		pathName: 'Register',
		Element: RegisterContainer
	},
	{
		path: '/ForgotPassword',
		pathName: 'Forgot Password',
		Element: ForgotPasswordContainer
	},
	{
		path: '/GlobalChat',
		pathName: 'Global Chat',
		Element: GlobalChat
	},
	{
		path: '/GlobalFeed',
		pathName: 'Global Feed',
		Element: GlobalFeed
	},
	{
		path: '/PrivateChats',
		pathName: 'Private Chats',
		Element: PrivateChats
	},
	{
		path: '/PrivateChat',
		pathName: 'Private Chat',
		Element: PrivateChat
	},
	{
		path: '/PrivateFeed',
		pathName: 'Private Feed',
		Element: PrivateFeed
	},
	{
		path: '/NearMe',
		pathName: 'Near Me',
		Element: NearMe
	},
	{
		path: '/Profile/:name',
		pathName: 'Profile',
		Element: Profile
	},
	{
		path: '*',
		pathName: 'Error404',
		Element: Error404
	}
];

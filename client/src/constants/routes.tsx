import { IRoutesProps } from '../models/interfaces';
import {
	Error404, ForgotPassword, GlobalChat, GlobalFeed, Home, Login, NearMe,
	PrivateChat, PrivateChats, PrivateFeed, Profile, Register
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
		Element: Login
	},
	{
		path: '/Register',
		pathName: 'Register',
		Element: Register
	},
	{
		path: '/ForgotPassword',
		pathName: 'Forgot Password',
		Element: ForgotPassword
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

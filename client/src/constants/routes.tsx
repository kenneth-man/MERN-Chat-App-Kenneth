import { IRoutesProps } from '../models/interfaces';
import {
	ForgotPasswordContainer, GlobalChatContainer, GlobalFeedContainer, LoginContainer, NearMeContainer,
	PrivateChatContainer, PrivateChatsContainer, PrivateFeedContainer, ProfileContainer, RegisterContainer,
	ResetPasswordContainer
} from '../pageContainers';
import {
	Error404, Home
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
		Element: GlobalChatContainer
	},
	{
		path: '/GlobalFeed',
		pathName: 'Global Feed',
		Element: GlobalFeedContainer
	},
	{
		path: '/PrivateChats',
		pathName: 'Private Chats',
		Element: PrivateChatsContainer
	},
	{
		path: '/PrivateChat',
		pathName: 'Private Chat',
		Element: PrivateChatContainer
	},
	{
		path: '/PrivateFeed',
		pathName: 'Private Feed',
		Element: PrivateFeedContainer
	},
	{
		path: '/NearMe',
		pathName: 'Near Me',
		Element: NearMeContainer
	},
	{
		path: '/ResetPassword/:token',
		pathName: 'Reset Password',
		Element: ResetPasswordContainer
	},
	{
		path: '/Profile/:name',
		pathName: 'Profile',
		Element: ProfileContainer
	},
	{
		path: '*',
		pathName: 'Error404',
		Element: Error404
	}
];

import type { PageData } from './types';
import { getImagePublicPath } from '@/utils/getPublicPath';

export const welcomePage: PageData = {
	id: 'welcome',
	title: 'Welcome',
	image: getImagePublicPath('pages/welcome.png'),
	subtitle: 'WELCOME_SUBTITLE',
	color: '#422023',
	content: ['WELCOME_DESCRIPTION'],
};

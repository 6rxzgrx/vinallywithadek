import type { PageData } from './types';
import { getImagePublicPath } from '@/utils/getPublicPath';

export const seeYouTherePage: PageData = {
	id: 'see-you-there',
	title: 'See You There',
	image: getImagePublicPath('pages/see-you-there.png'),
	subtitle: 'SEE_YOU_THERE_SUBTITLE',
	color: '#5a4a3a',
	content: ['SEE_YOU_THERE_DESCRIPTION'],
};

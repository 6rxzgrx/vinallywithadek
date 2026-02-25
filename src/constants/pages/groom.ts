import type { PageData } from './types';
import { getImagePublicPath } from '@/utils/getPublicPath';

export const groomPage: PageData = {
	id: 'groom',
	title: 'Groom',
	image: getImagePublicPath('pages/groom.png'),
	subtitle: 'GROOM_SUBTITLE',
	color: '#3d5255',
	content: ['GROOM_DESCRIPTION'],
};

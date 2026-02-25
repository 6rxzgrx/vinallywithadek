import type { PageData } from './types';
import { getImagePublicPath } from '@/utils/getPublicPath';

export const bridePage: PageData = {
	id: 'bride',
	title: 'Bride',
	image: getImagePublicPath('pages/bride.png'),
	subtitle: 'BRIDE_SUBTITLE',
	color: '#4f596e',
	content: ['BRIDE_DESCRIPTION'],
};

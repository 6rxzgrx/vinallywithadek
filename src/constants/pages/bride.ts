import type { PageData } from './types';
import { getImagePublicPath } from '@/utils/getPublicPath';

export const bridePage: PageData = {
	id: 'bride',
	title: 'Bride',
	image: getImagePublicPath('pages/bride.png'),
	subtitle: 'Vivi',
	color: '#4f596e',
	content: [
		'<p>Meet the bride - a beautiful soul who lights up every room she enters.</p>',
		`<img src="${getImagePublicPath('pages/bride-detail.png')}" alt="Bride" />`,
		'👰‍♀️ <b>Alviana Juni Susanti, S.Tr.Kom.</b>',
		'Putri ke 4 dari Bapak Kamani (Alm) dan Ibu Sri Utami Andayani',
	],
};

import type { PageData } from './types';
import { getImagePublicPath } from '@/utils/getPublicPath';

export const groomPage: PageData = {
	id: 'groom',
	title: 'Groom',
	image: getImagePublicPath('pages/groom.png'),
	subtitle: 'Adek',
	color: '#3d5255',
	content: [
		'<p>Meet the groom - a wonderful person who brings joy and love to everyone around him.</p>',
		`<img src="${getImagePublicPath('pages/groom-detail.png')}" alt="Groom" />`,
		'👨‍💼 <b>Adek Muhammad Zulkham Ristiawan Kertanegara, S.Tr.Kom.</b>',
		'Putra ke 1 dari Bapak Rismanto dan Ibu Eny Zulaiha',
	],
};

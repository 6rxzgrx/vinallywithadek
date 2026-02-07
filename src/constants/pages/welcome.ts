import type { PageData } from './types';
import { getImagePublicPath } from '@/utils/getPublicPath';

export const welcomePage: PageData = {
	id: 'welcome',
	title: 'Welcome',
	image: getImagePublicPath('pages/welcome.png'),
	subtitle: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
	color: '#422023',
	content: [
		'🤲 Dengan memohon rahmat & ridho Allah SWT kami mengundang Bapak/Ibu/Saudara/i sekalian untuk menghadiri acara pernikahan kami ',
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
		'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ۝٢١ ',
		'📖 <i>"Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."</i>',
		'<b>- Surah Ar Rum : 21</b>',
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
	],
};

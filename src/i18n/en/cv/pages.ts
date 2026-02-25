import { getImagePublicPath } from '@/utils/getPublicPath';

export const PAGES = {
	// Welcome page
	WELCOME_SUBTITLE: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
	WELCOME_DESCRIPTION:
		'🤲 With the grace and blessings of Allah SWT, we invite you to attend our wedding ceremony\n' +
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
		'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ۝٢١\n' +
		'📖 <i>"And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought."</i>\n' +
		'<b>- Surah Ar Rum : 21</b>\n' +
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~',

	// Groom page
	GROOM_SUBTITLE: 'Adek',
	GROOM_DESCRIPTION:
		'<p>Meet the groom - a wonderful person who brings joy and love to everyone around him.</p>\n' +
		`<img src="${getImagePublicPath('pages/groom-detail.jpg')}" alt="Groom" />\n` +
		'👨‍💼 <b>Adek Muhammad Zulkham Ristiawan Kertanegara, S.Tr.Kom.</b>\n' +
		'First son of Mr. Rismanto and Mrs. Eny Zulaiha',

	// Bride page
	BRIDE_SUBTITLE: 'Vivi',
	BRIDE_DESCRIPTION:
		'<p>Meet the bride - a beautiful soul who lights up every room she enters.</p>\n' +
		`<img src="${getImagePublicPath('pages/bride-detail.jpg')}" alt="Bride" />\n` +
		'👰‍♀️ <b>Alviana Juni Susanti, S.Tr.Kom.</b>\n' +
		'Fourth daughter of Mr. Kamani (deceased) and Mrs. Sri Utami Andayani',

	// See You There page
	SEE_YOU_THERE_SUBTITLE: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
	SEE_YOU_THERE_DESCRIPTION:
		'🌟 It is an honor and joy for us if you would attend and give your blessings for our wedding.\n' +
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
		'📑 <i>"We can\'t wait to share this special moment with you. Your presence will make our day even more meaningful."</i>\n' +
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
		'🙏 <b>Thank you for your presence and blessings.</b>',
} as const;

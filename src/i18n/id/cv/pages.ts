import { getImagePublicPath } from '@/utils/getPublicPath';

export const PAGES = {
	// Welcome page
	WELCOME_SUBTITLE: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
	WELCOME_DESCRIPTION:
		'🤲 Dengan memohon rahmat & ridho Allah SWT kami mengundang Bapak/Ibu/Saudara/i sekalian untuk menghadiri acara pernikahan kami\n' +
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
		'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ۝٢١\n' +
		'📖 <i>"Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."</i>\n' +
		'<b>- Surah Ar Rum : 21</b>\n' +
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~',

	// Groom page
	GROOM_SUBTITLE: 'Adek',
	GROOM_DESCRIPTION:
		'<p>Perkenalkan mempelai pria - pribadi yang membawa sukacita dan cinta bagi semua orang di sekitarnya.</p>\n' +
		`<img src="${getImagePublicPath('pages/groom-detail.jpg')}" alt="Mempelai Pria" />\n` +
		'👨‍💼 <b>Adek Muhammad Zulkham Ristiawan Kertanegara, S.Tr.Kom.</b>\n' +
		'Putra ke 1 dari Bapak Rismanto dan Ibu Eny Zulaiha',

	// Bride page
	BRIDE_SUBTITLE: 'Vivi',
	BRIDE_DESCRIPTION:
		'<p>Perkenalkan mempelai wanita - jiwa indah yang menerangi setiap ruangan yang dimasukinya.</p>\n' +
		`<img src="${getImagePublicPath('pages/bride-detail.jpg')}" alt="Mempelai Wanita" />\n` +
		'👰‍♀️ <b>Alviana Juni Susanti, S.Tr.Kom.</b>\n' +
		'Putri ke 4 dari Bapak Kamani (Alm) dan Ibu Sri Utami Andayani',

	// See You There page
	SEE_YOU_THERE_SUBTITLE: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
	SEE_YOU_THERE_DESCRIPTION:
		"🌟 Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan do'a restunya untuk pernikahan kami.\n" +
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
		'📑 <i>"We can\'t wait to share this special moment with you. Your presence will make our day even more meaningful."</i>\n' +
		'~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
		"🙏 <b>Atas kehadiran dan do'a restunya, kami ucapkan terima kasih.</b>",
} as const;

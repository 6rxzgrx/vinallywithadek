// CV - Translated to Indonesian
import { THE_PLACE } from './thePlace';
import { THE_DAY } from './theDay';
import { OUR_STORY } from './ourStory';
import { WEDDING_GIFT } from './weddingGift';
import { WEDDING_WISH } from './weddingWish';

export const cv = {
	// Titles
	EXPERIENCE: 'Pengalaman',
	EDUCATION: 'Pendidikan',

	// Page Songs
	Welcome: 'Selamat Datang',
	Groom: 'Pengantin Pria',
	Bride: 'Pengantin Wanita',
	'See You There': 'Sampai Jumpa',
	'About the Groom': 'Tentang Pengantin Pria',
	'About the Bride': 'Tentang Pengantin Wanita',

	// Playlists
	...THE_PLACE,
	...THE_DAY,
	...OUR_STORY,
	...WEDDING_GIFT,
	...WEDDING_WISH,
} as const;

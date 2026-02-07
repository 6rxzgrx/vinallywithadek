import { THE_PLACE } from './thePlace';
import { THE_DAY } from './theDay';
import { OUR_STORY } from './ourStory';
import { WEDDING_GIFT } from './weddingGift';
import { WEDDING_WISH } from './weddingWish';

export const cv = {
	// Titles
	EXPERIENCE: 'Experience',
	EDUCATION: 'Education',

	WEB_SITE: 'Web Site',
	Certificate: 'Certificate',
	Instagram: 'Instagram',

	// Page Songs
	Welcome: 'Welcome',
	Groom: 'The Groom',
	Bride: 'The Bride',
	'See You There': 'See You There',
	'About the Groom': 'About the Groom',
	'About the Bride': 'About the Bride',

	// Playlists
	...THE_PLACE,
	...THE_DAY,
	...OUR_STORY,
	...WEDDING_GIFT,
	...WEDDING_WISH,
} as const;

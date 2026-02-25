import { THE_PLACE } from './thePlace';
import { THE_DAY } from './theDay';
import { OUR_STORY } from './ourStory';
import { WEDDING_GIFT } from './weddingGift';
import { WEDDING_WISH } from './weddingWish';
import { TOP_SCENE } from './topScene';
import { TOP_SHOOT } from './topShoot';
import { PAGES } from './pages';
import { COUNTDOWN } from './countdown';

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
	...TOP_SCENE,
	...TOP_SHOOT,
	...PAGES,
	...COUNTDOWN,
} as const;

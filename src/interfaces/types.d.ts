import { TheDayTypesEnum } from '../constants/made-for/theDay';
import { ThePlaceTypesEnum } from '../constants/made-for/thePlace';
import { OurStoryTypesEnum } from '../constants/made-for/ourstory';
import { WeddingGiftTypesEnum } from '../constants/made-for/weddinggift';
import { WeddingWishTypesEnum } from '../constants/made-for/weddingwish';
import { BiggestHitsTypesEnum } from '../constants/bigger-hits/topShoot';

type SongType = TheDayTypesEnum | ThePlaceTypesEnum | OurStoryTypesEnum | WeddingGiftTypesEnum | WeddingWishTypesEnum | BiggestHitsTypesEnum;

export type Song = {
	name: string;
	length?: string;
	artist?: string;
	imageUrl?: string;
	skills: TagType[];
	description?: string;
	experience?: string;
	relatedSongs?: Song[];
	explanation?: string;
	avatar?: any;

	types?: SongType[];

	link?: string;
	github?: string;
	images?: string[];
	youtube?: string;
	certificate?: string;
	microsoft?: string;
	playstore?: string;
	appstore?: string;
	instagram?: string;
	eventDate?: string;
	eventTime?: string;
	eventPlace?: string;
	maps?: string;
	video?: string;
	/** Video orientation: 'landscape' (16:9) or 'portrait' (9:16). Auto-detected from video dimensions if not set. */
	videoOrientation?: 'landscape' | 'portrait';
	paymentDetails?: {
		accountNumber: string;
		accountName: string;
	};
};

export type Playlist = {
	name: string;
	description?: string;
	songs: Song[];
	color: string;
	filters?: string[];
	defaultFilter?: string;
	getImage: (lang: string) => string;
};

export type Description = {
	bulletPoints: string[];
	link?: string;
	tags?: TagType[];
};

export type User = {
	name: string;
	imageUrl?: string;
	playlists: Playlist[];
	linkedIn?: string;
	github?: string;
};

export type TagType = {
	text: string;
	color: string;
	icon?: any;
	link?: string;
	years?: string;
	experience?: string;
	image?: string;
};

// export type SocialNetwork = {
// 	name: string;
// 	imageUrl: string;
// 	link: string;
// 	icon: any;
// };

import type { Song } from '../../interfaces/types';
import { welcomePage } from './welcome';
import { groomPage } from './groom';
import { bridePage } from './bride';
import { seeYouTherePage } from './seeYouThere';

export const welcomeSong: Song = {
	name: welcomePage.title,
	imageUrl: welcomePage.image,
	artist: welcomePage.subtitle,
	description: welcomePage.content.join('\n'),
	skills: [],
};

export const groomSong: Song = {
	name: groomPage.title,
	imageUrl: groomPage.image,
	artist: groomPage.subtitle,
	description: groomPage.content.join('\n'),
	instagram: 'https://www.instagram.com/adekmzrk',
	skills: [],
};

export const brideSong: Song = {
	name: bridePage.title,
	imageUrl: bridePage.image,
	artist: bridePage.subtitle,
	description: bridePage.content.join('\n'),
	instagram: 'https://www.instagram.com/alvianajuni',
	skills: [],
};

export const seeYouSoonSong: Song = {
	name: seeYouTherePage.title,
	imageUrl: seeYouTherePage.image,
	artist: seeYouTherePage.subtitle,
	description: seeYouTherePage.content.join('\n'),
	skills: [],
};

export const pageSongs: Song[] = [
	welcomeSong,
	groomSong,
	brideSong,
	seeYouSoonSong,
];

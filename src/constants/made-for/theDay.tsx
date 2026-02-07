// Utils
import { getAlbumPath } from '../../utils/getPublicPath';

// Constants
import { GedungCarakaPutra } from './thePlace';

// Interfaces
import type { Playlist, Song } from '../../interfaces/types';

export enum TheDayTypesEnum {
	WEDDING_CEREMONY = 'Wedding Ceremony',
	RECEPTION = 'Reception',
}

const publicURL = (url: string) => (url.startsWith('/') ? url : `/${url}`);

// Song 2: Reception
export const Reception: Song = {
	name: 'Reception',
	imageUrl: publicURL('/images/theday/reception.png'),
	length: 'RECEPTION_LENGTH',
	description: 'RECEPTION_DESCRIPTION',
	explanation: 'RECEPTION_EXPLANATION',
	types: [TheDayTypesEnum.RECEPTION],
	skills: [],
	relatedSongs: [GedungCarakaPutra],
} as Song;

// Song 1: Wedding Ceremony
export const WeddingCeremony: Song = {
	name: 'Wedding Ceremony',
	imageUrl: publicURL('/images/theday/wedding-ceremony.png'),
	length: 'WEDDING_CEREMONY_LENGTH',
	description: 'WEDDING_CEREMONY_DESCRIPTION',
	explanation: 'WEDDING_CEREMONY_EXPLANATION',
	types: [TheDayTypesEnum.WEDDING_CEREMONY],
	skills: [],
	relatedSongs: [GedungCarakaPutra],
} as Song;

export const TheDay = {
	name: 'The Day',
	description: 'THE_DAY_DESCRIPTION',
	color: '#8B4513',
	songs: [WeddingCeremony, Reception],
	filters: [TheDayTypesEnum.WEDDING_CEREMONY, TheDayTypesEnum.RECEPTION],
	getImage(lang) {
		return getAlbumPath('TheDay-cover', lang, 'png');
	},
} as Playlist;

// Set relatedSongs for GrandBallroom after all songs are initialized to avoid circular dependency
GedungCarakaPutra.relatedSongs = [WeddingCeremony, Reception];

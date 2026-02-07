// Utils
import { getAlbumPath } from '../../utils/getPublicPath';

// Interfaces
import type { Playlist, Song } from '../../interfaces/types';

const publicURL = (url: string) => (url.startsWith('/') ? url : `/${url}`);

export const GedungCarakaPutra: Song = {
	name: 'Gedung Caraka Putra (GCP)',
	imageUrl: publicURL('/images/theplace/caraka.png'),
	length: 'GEDUNG_CARAKA_PUTRA_LENGTH',
	description: 'GEDUNG_CARAKA_PUTRA_DESCRIPTION',
	maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.5919901265156!2d112.35923747575775!3d-8.142951391887147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78979ed7db073d%3A0xcb222cd85a28cf8a!2sGedung%20Caraka%20Putra%20(GCP)!5e0!3m2!1sen!2sid!4v1768727602831!5m2!1sen!2sid',
	explanation: 'GEDUNG_CARAKA_PUTRA_EXPLANATION',
	skills: [],
} as Song;

export const ThePlace = {
	name: 'The Place',
	description: 'THE_PLACE_DESCRIPTION',
	color: '#228B22',
	songs: [GedungCarakaPutra],
	getImage(lang) {
		return getAlbumPath('ThePlace-cover', lang, 'png');
	},
} as Playlist;

// Utils
import {
	getAlbumPathWithoutLang,
	getImagePublicPath,
} from '../../utils/getPublicPath';

// Interfaces
import type { Playlist, Song } from '../../interfaces/types';

export const Shoot1: Song = {
	name: 'Shoot 1',
	imageUrl: getImagePublicPath('bigger-hits/shoot1.png'),
	length: '8',
	explanation:
		'This is a special moment from our top shoot collection. The image captures the essence of the moment perfectly.',
	images: [
		getImagePublicPath('bigger-hits/shoot1-1.jpg'),
		getImagePublicPath('bigger-hits/shoot1-2.jpg'),
		getImagePublicPath('bigger-hits/shoot1-3.jpg'),
		getImagePublicPath('bigger-hits/shoot1-4.jpg'),
		getImagePublicPath('bigger-hits/shoot1-5.jpg'),
		getImagePublicPath('bigger-hits/shoot1-6.jpg'),
		getImagePublicPath('bigger-hits/shoot1-7.jpg'),
		getImagePublicPath('bigger-hits/shoot1-8.jpg'),
	],
	skills: [],
	relatedSongs: [],
} as Song;

export const Shoot2: Song = {
	name: 'Shoot 2',
	imageUrl: getImagePublicPath('bigger-hits/shoot2.png'),
	length: '4:15',
	explanation:
		'This shoot represents one of the highlights from our top collection. Each image tells a unique story.',
	images: [
		getImagePublicPath('bigger-hits/shoot2-1.jpg'),
		getImagePublicPath('bigger-hits/shoot2-2.jpg'),
		getImagePublicPath('bigger-hits/shoot2-3.jpg'),
	],
	skills: [],
	relatedSongs: [],
} as Song;

export const Shoot3: Song = {
	name: 'Shoot 3',
	imageUrl: getImagePublicPath('bigger-hits/shoot3.png'),
	length: '6:20',
	explanation:
		'These images showcase some of the most memorable moments. Each photo has been carefully selected to represent the best of our collection.',
	images: [
		getImagePublicPath('bigger-hits/shoot3-2.jpg'),
		getImagePublicPath('bigger-hits/shoot3-3.jpg'),
	],
	skills: [],
	relatedSongs: [],
} as Song;

export const TopShoot = {
	name: 'frame-by-frame',
	description: 'The best shoot collection',
	color: '#FF6B9D',
	songs: [Shoot1, Shoot2, Shoot3],
	getImage() {
		return getAlbumPathWithoutLang('TopShoot-cover', 'png');
	},
} as Playlist;

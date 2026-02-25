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
	explanation: 'SHOOT_1_EXPLANATION',
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
	explanation: 'SHOOT_2_EXPLANATION',
	images: [
		getImagePublicPath('bigger-hits/shoot2-1.jpg'),
		getImagePublicPath('bigger-hits/shoot2-2.jpg'),
		getImagePublicPath('bigger-hits/shoot2-3.jpg'),
		getImagePublicPath('bigger-hits/shoot2-4.jpg'),
		getImagePublicPath('bigger-hits/shoot2-5.jpg'),
		getImagePublicPath('bigger-hits/shoot2-6.jpg'),
	],
	skills: [],
	relatedSongs: [],
} as Song;

export const Shoot3: Song = {
	name: 'Shoot 3',
	imageUrl: getImagePublicPath('bigger-hits/shoot3.png'),
	length: '6:20',
	explanation: 'SHOOT_3_EXPLANATION',
	images: [
		getImagePublicPath('bigger-hits/shoot3-1.jpg'),
		getImagePublicPath('bigger-hits/shoot3-2.jpg'),
		getImagePublicPath('bigger-hits/shoot3-3.jpg'),
		getImagePublicPath('bigger-hits/shoot3-4.jpg'),
		getImagePublicPath('bigger-hits/shoot3-5.jpg'),
		getImagePublicPath('bigger-hits/shoot3-6.jpg'),
	],
	skills: [],
	relatedSongs: [],
} as Song;

export const TopShoot = {
	name: 'frame-by-frame',
	description: 'TOP_SHOOT_DESCRIPTION',
	color: '#00BFFF',
	songs: [Shoot1, Shoot2, Shoot3],
	getImage() {
		return getAlbumPathWithoutLang('TopShoot-cover', 'png');
	},
} as Playlist;

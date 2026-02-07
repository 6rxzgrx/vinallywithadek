// Utils
import {
	getAlbumPathWithoutLang,
	getImagePublicPath,
	getVideoPublicPath,
} from '../../utils/getPublicPath';

// Interfaces
import type { Playlist, Song } from '../../interfaces/types';

export const Scene1: Song = {
	name: 'Scene 1',
	imageUrl: getImagePublicPath('bigger-hits/scene1.png'),
	length: '3:45',
	explanation: 'This scene captures a special moment beautifully.',
	//youtube: 'https://youtube.com/shorts/fT_MR2laCI8',
	video: getVideoPublicPath('video1.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene2: Song = {
	name: 'Scene 2',
	imageUrl: getImagePublicPath('bigger-hits/scene2.png'),
	length: '3:45',
	explanation: 'This scene captures a special moment beautifully.',
	video: getVideoPublicPath('video2.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const TopScene = {
	name: 'uncutted memories',
	description: 'Uncutted memories from our collection',
	color: '#4A90E2',
	songs: [Scene1, Scene2],
	getImage() {
		return getAlbumPathWithoutLang('TopScene-cover', 'png');
	},
} as Playlist;

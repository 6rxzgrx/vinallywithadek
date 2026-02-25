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
	length: '345',
	explanation: 'SCENE_1_EXPLANATION',
	video: getVideoPublicPath('video1.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene2: Song = {
	name: 'Scene 2',
	imageUrl: getImagePublicPath('bigger-hits/scene2.png'),
	length: '345',
	explanation: 'SCENE_2_EXPLANATION',
	video: getVideoPublicPath('video2.mp4'),
	videoOrientation: 'landscape',
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene3: Song = {
	name: 'Scene 3',
	imageUrl: getImagePublicPath('bigger-hits/scene3.png'),
	length: '345',
	explanation: 'SCENE_3_EXPLANATION',
	video: getVideoPublicPath('video3.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const TopScene = {
	name: 'uncutted memories',
	description: 'TOP_SCENE_DESCRIPTION',
	color: '#3AA8C1',
	songs: [Scene1, Scene2, Scene3],
	getImage() {
		return getAlbumPathWithoutLang('TopScene-cover', 'png');
	},
} as Playlist;

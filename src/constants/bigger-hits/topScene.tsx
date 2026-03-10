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
	length: '23s',
	explanation: 'SCENE_1_EXPLANATION',
	video: getVideoPublicPath('video1.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene2: Song = {
	name: 'Scene 2',
	imageUrl: getImagePublicPath('bigger-hits/scene2.png'),
	length: '1m 17s',
	explanation: 'SCENE_2_EXPLANATION',
	video: getVideoPublicPath('video2.mp4'),
	videoOrientation: 'landscape',
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene3: Song = {
	name: 'Scene 3',
	imageUrl: getImagePublicPath('bigger-hits/scene3.png'),
	length: '25s',
	explanation: 'SCENE_3_EXPLANATION',
	video: getVideoPublicPath('video3.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene4: Song = {
	name: 'Scene 4',
	imageUrl: getImagePublicPath('bigger-hits/scene4.png'),
	length: '21s',
	explanation: 'SCENE_4_EXPLANATION',
	video: getVideoPublicPath('video4.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene5: Song = {
	name: 'Scene 5',
	imageUrl: getImagePublicPath('bigger-hits/scene5.png'),
	length: '25s',
	explanation: 'SCENE_5_EXPLANATION',
	video: getVideoPublicPath('video5.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene6: Song = {
	name: 'Scene 6',
	imageUrl: getImagePublicPath('bigger-hits/scene6.png'),
	length: '19s',
	explanation: 'SCENE_6_EXPLANATION',
	video: getVideoPublicPath('video6.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const TopScene = {
	name: 'uncutted memories',
	description: 'TOP_SCENE_DESCRIPTION',
	color: '#3AA8C1',
	songs: [Scene1, Scene2, Scene4, Scene3, Scene5, Scene6],
	getImage() {
		return getAlbumPathWithoutLang('TopScene-cover', 'png');
	},
} as Playlist;

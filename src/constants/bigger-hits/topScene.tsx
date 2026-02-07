// Utils
import { getAlbumPathWithoutLang } from '../../utils/getPublicPath';

// Interfaces
import type { Playlist, Song } from '../../interfaces/types';

const publicURL = (url: string) => (url.startsWith('/') ? url : `/${url}`);

export const Scene1: Song = {
	name: 'Scene 1',
	imageUrl: publicURL('/images/bigger-hits/scene1.png'),
	length: '3:45',
	explanation: 'This scene captures a special moment beautifully.',
	//youtube: 'https://youtube.com/shorts/fT_MR2laCI8',
	video: publicURL('/video/video1.mp4'),
	skills: [],
	relatedSongs: [],
} as Song;

export const Scene2: Song = {
	name: 'Scene 2',
	imageUrl: publicURL('/images/bigger-hits/scene2.png'),
	length: '3:45',
	explanation: 'This scene captures a special moment beautifully.',
	video: publicURL('/video/video2.mp4'),
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

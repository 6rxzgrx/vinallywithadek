// Utils
import { getAlbumPathWithoutLang } from '../../utils/getPublicPath';

// Interfaces
import type { Playlist, Song } from '../../interfaces/types';

const publicURL = (url: string) => (url.startsWith('/') ? url : `/${url}`);

// Example story - replace with actual stories
export const Story1: Song = {
	name: 'STORY_NAME_1',
	imageUrl: publicURL('/images/ourstory/story1.png'),
	length: 'STORY_LENGTH_1',
	description: 'STORY_DETAILS_1',
	explanation: 'STORY_EXPLANATION_1',
	skills: [],
	relatedSongs: [],
} as Song;

// Example story - replace with actual stories
export const Story2: Song = {
	name: 'STORY_NAME_2',
	imageUrl: publicURL('/images/ourstory/story2.png'),
	length: 'STORY_LENGTH_2',
	description: 'STORY_DETAILS_2',
	explanation: 'STORY_EXPLANATION_2',
	skills: [],
	relatedSongs: [],
} as Song;

// Example story - replace with actual stories
export const Story3: Song = {
	name: 'STORY_NAME_3',
	imageUrl: publicURL('/images/ourstory/story3.png'),
	length: 'STORY_LENGTH_3',
	description: 'STORY_DETAILS_3',
	explanation: 'STORY_EXPLANATION_3',
	skills: [],
	relatedSongs: [],
} as Song;

// Example story - replace with actual stories
export const Story4: Song = {
	name: 'STORY_NAME_4',
	imageUrl: publicURL('/images/ourstory/story4.png'),
	length: 'STORY_LENGTH_4',
	description: 'STORY_DETAILS_4',
	explanation: 'STORY_EXPLANATION_4',
	skills: [],
	relatedSongs: [],
} as Song;

// Example story - replace with actual stories
export const Story5: Song = {
	name: 'STORY_NAME_5',
	imageUrl: publicURL('/images/ourstory/story5.png'),
	length: 'STORY_LENGTH_5',
	description: 'STORY_DETAILS_5',
	explanation: 'STORY_EXPLANATION_5',
	skills: [],
	relatedSongs: [],
} as Song;

// Example story - replace with actual stories
export const Story6: Song = {
	name: 'STORY_NAME_6',
	imageUrl: publicURL('/images/ourstory/story1.png'),
	length: 'STORY_LENGTH_6',
	description: 'STORY_DETAILS_6',
	explanation: 'STORY_EXPLANATION_6',
	skills: [],
	relatedSongs: [],
} as Song;

export const OurStory = {
	name: 'A - V',
	description: 'OUR_STORY_DESCRIPTION',
	color: '#FF6B9D',
	songs: [Story1, Story2, Story3, Story4, Story5, Story6],
	getImage() {
		return getAlbumPathWithoutLang('OurStory-cover', 'png');
	},
} as Playlist;

import type { Playlist } from '../../interfaces/types';

import { TheDay } from './theDay';
import { ThePlace } from './thePlace';
import { OurStory } from './ourstory';
import { WeddingGift } from './weddinggift';
import { WeddingWish } from './weddingwish';

export const playlists: Playlist[] = [
	TheDay,
	ThePlace,
	OurStory,
	WeddingWish,
	WeddingGift,
];

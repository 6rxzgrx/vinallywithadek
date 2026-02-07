// Utils
import { getAlbumPathWithoutLang } from '../../utils/getPublicPath';

// Interfaces
import type { Playlist } from '../../interfaces/types';

export const Countdown = {
	name: 'almost there',
	description: 'Countdown to our special day',
	color: '#1ed760', // Dark green-brown color matching the image
	songs: [], // No songs needed for countdown
	getImage() {
		return getAlbumPathWithoutLang('Countdown-cover', 'png');
	},
} as Playlist;


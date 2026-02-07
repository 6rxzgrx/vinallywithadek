// Utils
import { getAlbumPath } from '../../utils/getPublicPath';
import supabase from '../../utils/supabase';

// Interfaces
import type { Playlist, Song } from '../../interfaces/types';


// Generate avatar URL using DiceBear API with saved seed
// Documentation: https://www.dicebear.com/how-to-use/http-api/
const generateAvatarUrl = (seed: string): string => {
	if (!seed) {
		// Fallback: generate a seed if none exists (for backward compatibility)
		seed = Math.random().toString(36).substring(2, 15);
	}
	return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundType=solid,gradientLinear&eyes=variant05,variant03&lips=variant30,variant03,variant11,variant14,variant15,variant17,variant16,variant22,variant23,variant25&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
};

// Format timestamp to readable date/time
const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

// In-memory cache so Wedding Wish page doesn't load again after prefetch
let cachedWishes: Song[] | null = null;
let pendingFetch: Promise<Song[]> | null = null;

const fetchWishesFromSupabase = async (): Promise<Song[]> => {
	const { data, error } = await supabase
		.from('wishes')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching wishes:', error);
		return [];
	}

	if (!data || data.length === 0) {
		return [];
	}

	return data.map((wish) => ({
		name: wish.name,
		length: formatDate(wish.created_at),
		explanation: formatDate(wish.created_at),
		description: wish.wish,
		imageUrl: generateAvatarUrl(wish.seed || ''), // Use saved seed from database
		skills: [],
		relatedSongs: [],
	} as Song));
};

// Fetch wishes: use cache if available (no loading on page open). Set forceRefresh=true to refetch (e.g. after new wish).
export const fetchWishes = async (forceRefresh = false): Promise<Song[]> => {
	try {
		if (cachedWishes !== null && !forceRefresh) {
			return cachedWishes;
		}
		if (forceRefresh) {
			pendingFetch = null;
		}
		if (pendingFetch) {
			const wishes = await pendingFetch;
			if (cachedWishes === null) {
				cachedWishes = wishes;
				notifyWishesCached();
			}
			return wishes;
		}
		pendingFetch = fetchWishesFromSupabase();
		const wishes = await pendingFetch;
		pendingFetch = null;
		cachedWishes = wishes;
		notifyWishesCached();
		return wishes;
	} catch (error) {
		pendingFetch = null;
		console.error('Error fetching wishes:', error);
		return [];
	}
};

const WISHES_CACHED_EVENT = 'wishesCached';

const notifyWishesCached = (): void => {
	if (cachedWishes !== null) {
		window.dispatchEvent(new CustomEvent(WISHES_CACHED_EVENT, { detail: cachedWishes.length }));
	}
};

// Call on first app open so Wedding Wish page has data ready and doesn't show loading
export const prefetchWishes = (): void => {
	if (cachedWishes !== null || pendingFetch) return;
	pendingFetch = fetchWishesFromSupabase();
	pendingFetch.then((wishes) => {
		cachedWishes = wishes;
		pendingFetch = null;
		notifyWishesCached();
	});
};

/** Cached wish count for display (e.g. "Playlist • X songs"). Use with Wedding Wish only. */
export const getCachedWishesCount = (): number =>
	cachedWishes === null ? 0 : cachedWishes.length;

/** Event name to subscribe to for cache updates (detail = count). */
export const WISHES_CACHED_EVENT_NAME = WISHES_CACHED_EVENT;

// Example wish - fallback if no wishes are fetched
export const Wish1: Song = {
	name: 'WISH_SENDER_NAME_1',
	imageUrl: generateAvatarUrl('Us'),
	length: 'WISH_TIME_1',
	description: 'WISH_TEXT_1',	
	explanation: 'WISH_TIME_1',
	skills: [],
	relatedSongs: [],
} as Song;

// Create WeddingWish playlist with dynamic songs. Use forceRefresh=true after a new wish is submitted.
export const createWeddingWishPlaylist = async (forceRefresh = false): Promise<Playlist> => {
	const wishes = await fetchWishes(forceRefresh);

	return {
		name: 'Wedding Wish',
		description: 'WEDDING_WISH_DESCRIPTION',
		color: '#FF69B4',
		songs: wishes.length > 0 ? wishes : [Wish1], 
		getImage(lang) {
			return getAlbumPath('WeddingWish-cover', lang, 'png');
		},
	} as Playlist;
};

// Default export for backward compatibility (will use fallback)
export const WeddingWish: Playlist = {
	name: 'Wedding Wish',
	description: 'WEDDING_WISH_DESCRIPTION',
	color: '#FF69B4',
	songs: [Wish1],
	getImage(lang) {
		return getAlbumPath('WeddingWish-cover', lang, 'png');
	},
} as Playlist;


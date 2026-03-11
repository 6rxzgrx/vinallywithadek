import {
	getAlbumPath,
	getAlbumPathWithoutLang,
	getImagePublicPath,
	getSongPath,
} from './getPublicPath';
import { AVAILABLE_SONGS } from '@/constants/songs';
import { biggerHitsPlaylists } from '@/constants/bigger-hits';
import type { Song } from '@/interfaces/types';

const LANGUAGES = ['en', 'id'] as const;

/** All image URLs used across the app - preload on first load */
function getPreloadImageUrls(): string[] {
	const img = getImagePublicPath;
	return [
		// Pages
		img('pages/welcome.png'),
		img('pages/bride.png'),
		img('pages/groom.png'),
		img('pages/bride-detail.jpg'),
		img('pages/groom-detail.jpg'),
		img('pages/see-you-there.png'),
		// Login & UI
		img('invitation-logo.svg'),
		img('info.svg'),
		img('forward.svg'),
		img('profile.png'),
		// Song covers (playing bar, queue, etc.)
		...AVAILABLE_SONGS.map((s) => img(`songs/${s.image}`)),
		// Album covers (without lang)
		getAlbumPathWithoutLang('TopScene-cover', 'png'),
		getAlbumPathWithoutLang('TopShoot-cover', 'png'),
		getAlbumPathWithoutLang('Countdown-cover', 'png'),
		getAlbumPathWithoutLang('OurStory-cover', 'png'),
		// Album covers (with lang)
		...LANGUAGES.flatMap((lang) => [
			getAlbumPath('TheDay-cover', lang, 'png'),
			getAlbumPath('ThePlace-cover', lang, 'png'),
			getAlbumPath('WeddingGift-cover', lang, 'png'),
			getAlbumPath('WeddingWish-cover', lang, 'png'),
		]),
	];
}

function preloadImage(url: string): Promise<void> {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve();
		img.onerror = () => resolve(); // Don't block on failed assets
		img.src = url;
	});
}

function preloadVideo(url: string): Promise<void> {
	return new Promise((resolve) => {
		const video = document.createElement('video');
		video.preload = 'auto';
		video.muted = true;

		const done = () => {
			video.onloadeddata = null;
			video.onerror = null;
			resolve();
		};

		video.onloadeddata = done;
		video.onerror = done; // Don't block on failed assets
		video.src = url;
		video.load();
	});
}

function preloadAudio(url: string): Promise<void> {
	return new Promise((resolve) => {
		const audio = new Audio();
		audio.preload = 'auto';

		const done = () => {
			audio.onloadeddata = null;
			audio.onerror = null;
			resolve();
		};

		audio.onloadeddata = done;
		audio.onerror = done; // Don't block on failed assets
		audio.src = url;
		audio.load();
	});
}

function uniqueUrls(urls: string[]): string[] {
	return Array.from(new Set(urls));
}

const PUBLIC_VIDEO_MODULES = import.meta.glob(
	'/public/videos/**/*.{mp4,webm,ogg,mov,m4v}',
);
const PUBLIC_WEDDING_WISH_GIF_MODULES = import.meta.glob(
	'/public/images/wedding-wish/**/*.gif',
);

function toPublicAssetUrl(projectPath: string): string {
	const assetPath = projectPath.replace(/^\/public\//, '');
	const baseUrl = import.meta.env.BASE_URL;
	return `${baseUrl}${assetPath}`;
}

function getAllPublicVideoUrls(): string[] {
	return uniqueUrls(
		Object.keys(PUBLIC_VIDEO_MODULES).map((projectPath) =>
			toPublicAssetUrl(projectPath),
		),
	);
}

function getWeddingWishGifUrls(): string[] {
	return uniqueUrls(
		Object.keys(PUBLIC_WEDDING_WISH_GIF_MODULES).map((projectPath) =>
			toPublicAssetUrl(projectPath),
		),
	);
}

function getBiggerHitsAssetUrls(): {
	imageUrls: string[];
	videoUrls: string[];
} {
	const imageUrls: string[] = [];
	const videoUrls: string[] = [];

	biggerHitsPlaylists.forEach((playlist) => {
		// Playlist card/cover image.
		imageUrls.push(playlist.getImage('id'));

		playlist.songs.forEach((song: Song) => {
			if (song.imageUrl) imageUrls.push(song.imageUrl);
			if (song.images?.length) imageUrls.push(...song.images);
			if (song.video) videoUrls.push(song.video);
		});
	});

	return {
		imageUrls: uniqueUrls(imageUrls),
		videoUrls: uniqueUrls(videoUrls),
	};
}

function getAllSongAudioUrls(): string[] {
	return uniqueUrls(AVAILABLE_SONGS.map((song) => getSongPath(song.file)));
}

/**
 * Preload all images and videos used in the app.
 * Resolves when all assets have been requested (failures don't block).
 */
export function preloadAllAssets(): Promise<void> {
	const imageUrls = uniqueUrls([...getPreloadImageUrls(), ...getWeddingWishGifUrls()]);
	//const videoUrls = getPreloadVideoUrls();
	const imagePromises = imageUrls.map(preloadImage);
	//const videoPromises = videoUrls.map(preloadVideo);
	return Promise.all([...imagePromises]).then(() => {});
}

/**
 * Preload heavier home-page assets the first time user enters Home.
 * Includes bigger-hits images and videos from /public/videos.
 */
export function preloadHomeEntryAssets(): Promise<void> {
	const { imageUrls, videoUrls } = getBiggerHitsAssetUrls();
	const homeVideoUrls = getAllPublicVideoUrls();
	const songAudioUrls = getAllSongAudioUrls();
	const finalVideoUrls = uniqueUrls([...videoUrls, ...homeVideoUrls]);

	const imagePromises = imageUrls.map(preloadImage);
	const videoPromises = finalVideoUrls.map(preloadVideo);
	const audioPromises = songAudioUrls.map(preloadAudio);

	return Promise.all([...imagePromises, ...videoPromises, ...audioPromises]).then(() => {});
}

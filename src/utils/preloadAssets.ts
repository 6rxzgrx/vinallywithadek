import {
	getAlbumPath,
	getAlbumPathWithoutLang,
	getImagePublicPath,
} from './getPublicPath';
import { AVAILABLE_SONGS } from '@/constants/songs';

const LANGUAGES = ['en', 'id'] as const;

/** All image URLs used across the app - preload on first load */
function getPreloadImageUrls(): string[] {
	const img = getImagePublicPath;
	return [
		// Pages
		img('pages/welcome.png'),
		img('pages/bride.png'),
		img('pages/groom.png'),
		img('pages/bride-detail.png'),
		img('pages/groom-detail.png'),
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

/**
 * Preload all images and videos used in the app.
 * Resolves when all assets have been requested (failures don't block).
 */
export function preloadAllAssets(): Promise<void> {
	const imageUrls = getPreloadImageUrls();
	//const videoUrls = getPreloadVideoUrls();
	const imagePromises = imageUrls.map(preloadImage);
	//const videoPromises = videoUrls.map(preloadVideo);
	return Promise.all([...imagePromises]).then(() => {});
}

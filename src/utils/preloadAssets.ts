import {
	getAlbumPath,
	getAlbumPathWithoutLang,
	getImagePublicPath,
	getVideoPublicPath,
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
		img('profile.jpg'),
		// Bigger hits - scenes & shoots
		img('bigger-hits/scene1.png'),
		img('bigger-hits/scene2.png'),
		img('bigger-hits/shoot1.png'),
		img('bigger-hits/shoot2.png'),
		img('bigger-hits/shoot3.png'),
		img('bigger-hits/shoot1-1.jpg'),
		img('bigger-hits/shoot1-2.jpg'),
		img('bigger-hits/shoot2-1.jpg'),
		img('bigger-hits/shoot2-2.jpg'),
		img('bigger-hits/shoot2-3.jpg'),
		img('bigger-hits/shoot3-2.jpg'),
		img('bigger-hits/shoot3-3.jpg'),
		// Our story
		img('ourstory/story1.png'),
		img('ourstory/story2.png'),
		img('ourstory/story3.png'),
		img('ourstory/story4.png'),
		img('ourstory/story5.png'),
		img('ourstory/story1-1.png'),
		img('ourstory/story2-1.png'),
		img('ourstory/story3-1.png'),
		img('ourstory/story4-1.png'),
		img('ourstory/story5-1.png'),
		img('ourstory/story6-1.png'),
		// The day & place
		img('theday/reception.png'),
		img('theday/wedding-ceremony.png'),
		img('theplace/caraka.png'),
		// Wedding gift
		img('wedding-gift/bri.png'),
		img('wedding-gift/bca.png'),
		img('wedding-gift/mandiri.png'),
		img('wedding-gift/dana.png'),
		img('wedding-gift/jago.png'),
		img('wedding-gift/shopee.png'),
		img('wedding-gift/home.png'),
		img('wedding-wish/giphy.gif'),
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

/** All video URLs used across the app */
function getPreloadVideoUrls(): string[] {
	return [
		getVideoPublicPath('video1.mp4'),
		getVideoPublicPath('video2.mp4'),
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
		video.onloadeddata = () => resolve();
		video.onerror = () => resolve();
		video.src = url;
		video.load();
	});
}

/**
 * Preload all images and videos used in the app.
 * Resolves when all assets have been requested (failures don't block).
 */
export function preloadAllAssets(): Promise<void> {
	const imageUrls = getPreloadImageUrls();
	const videoUrls = getPreloadVideoUrls();
	const imagePromises = imageUrls.map(preloadImage);
	const videoPromises = videoUrls.map(preloadVideo);
	return Promise.all([...imagePromises, ...videoPromises]).then(() => {});
}

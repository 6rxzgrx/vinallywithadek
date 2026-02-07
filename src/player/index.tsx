import { store } from '../store/store';

// Utils
import { getSongPath } from '../utils/getPublicPath';

// Constants
import { AVAILABLE_SONGS } from '../constants/songs';

export const AudioPlayer: Partial<HTMLAudioElement> =
	document.getElementById('audio')!;

export const pauseAudio = () => {
	// @ts-ignore
	AudioPlayer?.pause();
};

export const startAudio = async () => {
	try {
		// @ts-ignore
		const playPromise = AudioPlayer.play();
		if (playPromise !== undefined) {
			await playPromise;
		}
	} catch (error) {
		// Autoplay was prevented - user interaction required
		console.warn(
			'Autoplay prevented. User interaction required to play audio.'
		);
		// Update Redux state to reflect that playback failed
		store.dispatch({ type: 'playingBar/setPause' });
	}
};

export const mute = () => {
	AudioPlayer.muted = true;
};

export const unmute = () => {
	AudioPlayer.muted = false;
};

export const setPlayerVolume = (volume: number) => {
	AudioPlayer.volume = volume;
};

export const getCurrentDuration = () => {
	return AudioPlayer.duration;
};

export const play = async (index: number, volume?: number) => {
	AudioPlayer.src = getSongPath(AVAILABLE_SONGS[index].file);
	if (volume) {
		AudioPlayer.volume = volume;
	}
	try {
		// @ts-ignore
		const playPromise = AudioPlayer.play();
		if (playPromise !== undefined) {
			await playPromise;
		}
	} catch (error) {
		// Autoplay was prevented - user interaction required
		console.warn(
			'Autoplay prevented. User interaction required to play audio.'
		);
		// Update Redux state to reflect that playback failed
		store.dispatch({ type: 'playingBar/setPause' });
	}
};

AudioPlayer.ondurationchange = (e) => {
	// @ts-ignore
	const value = e.target.duration;

	// if not nan
	if (value) {
		store.dispatch({ type: 'playingBar/setDuration', payload: value });
	}
};

const onPlayNext = () => {
	store.dispatch({ type: 'playingBar/nextSong' });
};

// @ts-ignore
AudioPlayer.addEventListener('ended', onPlayNext);

export const onLoop = () => {
	AudioPlayer.loop = true;
	// @ts-ignore
	AudioPlayer.removeEventListener('ended', onPlayNext);
};

export const onRemoveLoop = () => {
	AudioPlayer.loop = false;
	// @ts-ignore
	AudioPlayer.addEventListener('ended', onPlayNext);
};

export const setCurrentTimeForPlayer = (value: number) => {
	AudioPlayer.currentTime = value;
};

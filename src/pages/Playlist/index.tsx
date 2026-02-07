// Components
import { PlaylistList } from './list';
import { PlaylistHeader } from './header';
import { CountdownHeader } from './countdownHeader';

// Utils
import { FC, RefObject, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Constants
import { playlists } from '../../constants/made-for';
import { biggerHitsPlaylists } from '../../constants/bigger-hits';
import { createWeddingWishPlaylist } from '../../constants/made-for/weddingwish';

// Redux
import { useAppDispatch } from '../../store/store';
import { playlistActions } from '../../store/slices/playlist';

// Interfaces
import type { Playlist } from '../../interfaces/types';

const PlaylistView: FC<{ container: RefObject<HTMLDivElement | null> }> = (
	props
) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { playlistId } = useParams();
	const [dynamicPlaylist, setDynamicPlaylist] = useState<Playlist | null>(null);

	// Combine all playlists from both sources
	const allPlaylists = [...playlists, ...biggerHitsPlaylists];

	// Decode URL parameter and normalize for comparison
	const normalizedPlaylistId = playlistId ? decodeURIComponent(playlistId).toLowerCase() : '';

	const staticPlaylist = allPlaylists.find(
		(playlist) => playlist.name.toLowerCase() === normalizedPlaylistId
	);

	const isWeddingWish = staticPlaylist?.name === 'Wedding Wish';

	// Use prefetched wishes for Wedding Wish (no loading). Force refresh when user submits a new wish.
	useEffect(() => {
		const refreshWishes = (forceRefresh = false) => {
			if (isWeddingWish) {
				createWeddingWishPlaylist(forceRefresh).then((playlist) => {
					setDynamicPlaylist(playlist);
				});
			} else {
				setDynamicPlaylist(null);
			}
		};

		refreshWishes();

		const handleWishSubmitted = () => {
			refreshWishes(true);
		};
		window.addEventListener('wishSubmitted', handleWishSubmitted);

		return () => {
			window.removeEventListener('wishSubmitted', handleWishSubmitted);
		};
	}, [isWeddingWish]);

	const playlist = isWeddingWish ? (dynamicPlaylist || staticPlaylist) : staticPlaylist;
	const isCountdown = playlist?.name === 'almost there';

	useEffect(() => {
		if (!playlist) {
			navigate('/404');
		}

		if (!isCountdown) {
			dispatch(
				playlistActions.resetOrder({ order: playlist?.defaultFilter || '' })
			);
		}
	}, [dispatch, playlist, navigate, isCountdown]);

	if (!playlist) {
		return null;
	}

	return (
		<div className="Playlist-section" key={playlistId}>
			{isCountdown ? (
				<CountdownHeader playlist={playlist} />
			) : (
				<>
					<PlaylistHeader playlist={playlist} container={props.container} />
					<PlaylistList playlist={playlist} />
				</>
			)}
		</div>
	);
};

PlaylistView.displayName = 'PlaylistView';

export default PlaylistView;

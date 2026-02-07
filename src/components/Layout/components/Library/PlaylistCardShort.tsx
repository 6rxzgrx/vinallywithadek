import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Playlist } from '../../../../interfaces/types';
import { useAppSelector } from '../../../../store/store';
import { Tooltip } from '../../../Tooltip';
import {
	getCachedWishesCount,
	WISHES_CACHED_EVENT_NAME,
} from '../../../../constants/made-for/weddingwish';

const WEDDING_WISH_PLAYLIST_NAME = 'Wedding Wish';

const PlaylistCardShort = ({
	playlist,
	onClick,
}: {
	playlist: Playlist;
	onClick: () => void;
}) => {
	const { t: cvt } = useTranslation(['cv']);
	const { t } = useTranslation(['playlist']);
	const language = useAppSelector((state) => state.language.language);
	const collapsed = useAppSelector((state) => state.library.collapsed);

	const isWeddingWish = playlist.name === WEDDING_WISH_PLAYLIST_NAME;
	const [weddingWishCount, setWeddingWishCount] = useState(() =>
		isWeddingWish ? getCachedWishesCount() || playlist.songs.length : 0
	);

	useEffect(() => {
		if (!isWeddingWish) return;
		const count = getCachedWishesCount();
		if (count > 0) setWeddingWishCount(count);
		const handler = () => setWeddingWishCount(getCachedWishesCount());
		window.addEventListener(WISHES_CACHED_EVENT_NAME, handler);
		return () => window.removeEventListener(WISHES_CACHED_EVENT_NAME, handler);
	}, [isWeddingWish]);

	const songCount = isWeddingWish && weddingWishCount > 0 ? weddingWishCount : playlist.songs.length;

	if (collapsed) {
		return (
			<Tooltip
				placement="right"
				title={
					<div>
						<p>{cvt(playlist.name)}</p>
						<p style={{ fontSize: 13, color: 'gray', fontWeight: 400 }}>
							Playlist • {songCount} {t('songs')}
						</p>
					</div>
				}
			>
				<button
					style={{
						borderRadius: 10,
						display: 'flex',
						justifyContent: 'center',
					}}
					className="library-card collapsed"
					onClick={onClick}
				>
					<div className="image aspect-square h-full items-center">
						<img
							src={playlist.getImage(language)}
							alt=""
							style={{ width: 52 }}
						/>
					</div>
				</button>
			</Tooltip>
		);
	}

	return (
		<button
			style={{ borderRadius: 10 }}
			className="library-card"
			onClick={onClick}
		>
			<div className="image aspect-square p-1 h-full items-center">
				<img src={playlist.getImage(language)} alt="" style={{ width: 52 }} />
			</div>
			<div id="playlist-song-and-artist-name">
				<h3
					className="text-md font-semibold text-white"
					style={{ fontSize: 15, marginBottom: -5 }}
				>
					{cvt(playlist.name)}
				</h3>

				<p
					className="text-md font-semibold text-white"
					style={{
						fontSize: 13,
						opacity: 0.7,
						fontWeight: 400,
					}}
				>
					Playlist • {songCount} {t('songs')}
				</p>
			</div>
		</button>
	);
};

export default PlaylistCardShort;

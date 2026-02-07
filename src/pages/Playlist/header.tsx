import { Col, Row, Space } from 'antd';

// I18n
import { useTranslation } from 'react-i18next';

// Interfaces
import { RefObject, useEffect, useState, type FC } from 'react';
import type { Playlist } from '../../interfaces/types';
import { Link } from 'react-router-dom';

// Utils
import tinycolor from 'tinycolor2';
import { useAppSelector } from '../../store/store';
import { PlayCircleButton } from './playCircle';
import {
	getCachedWishesCount,
	WISHES_CACHED_EVENT_NAME,
} from '../../constants/made-for/weddingwish';

interface PlaylistHeaderProps {
	playlist: Playlist;
	container: RefObject<HTMLDivElement | null>;
}

export const PlaylistHeader: FC<PlaylistHeaderProps> = ({
	playlist,
	container,
}) => {
	const { t } = useTranslation(['playlist']);
	const { t: cvt } = useTranslation(['cv']);

	const [headerWidth, setHeaderWidth] = useState(0);
	const [activeHeader, setActiveHeader] = useState(false);
	const language = useAppSelector((state) => state.language.language);
	const collapsed = useAppSelector((state) => state.library.collapsed);
	const detailsOpen = useAppSelector((state) => state.library.detailsOpen);

	const isWeddingWish = playlist.name === 'Wedding Wish';
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
	const displaySongCount =
		isWeddingWish && weddingWishCount > 0 ? weddingWishCount : playlist.songs.length;

	// Truncate title to 15 characters
	const playlistName = cvt(playlist.name);
	const truncatedTitle =
		playlistName.length > 15
			? playlistName.substring(0, 15) + '...'
			: playlistName;

	useEffect(() => {
		const ref = container.current;

		const handleScroll = () => {
			if (ref) {
				setActiveHeader(ref.scrollTop > 260);
			}
		};

		ref?.addEventListener('scroll', handleScroll);

		setHeaderWidth(container.current?.clientWidth || 0);
		window.onresize = () => {
			if (container.current) {
				setHeaderWidth(container.current.clientWidth);
			}
		};
		return () => {
			window.onresize = null;
			ref?.removeEventListener('scroll', handleScroll);
		};
	}, [container, detailsOpen, collapsed]);

	return (
		<div
			style={{
				overflow: 'auto',
				position: 'relative',
				background: `linear-gradient(180deg, transparent 0px, ${playlist.color} 80%), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=")`,
			}}
		>
			<div
				className={`nav-header ${activeHeader ? 'active' : ''}`}
				style={{
					width: headerWidth,
					opacity: !headerWidth ? 0 : 1,
					backgroundColor: !activeHeader
						? 'transparent'
						: tinycolor(playlist.color).darken(10).toRgbString(),
				}}
			>
				<Space>
					<PlayCircleButton size={20} />
					<h1 className="nav-header-playlist-title" title={playlistName}>
						{activeHeader ? truncatedTitle : playlistName}
					</h1>
				</Space>
			</div>

			<div className="playlist-header-content">
				<Row gutter={[24, 24]} align={'middle'}>
					<Col xs={24} sm={6} lg={5}>
						<img
							src={playlist.getImage(language)}
							alt=""
							className="playlist-img"
						/>
					</Col>
					<Col xs={24} sm={18} lg={19}>
						<Row justify="space-between">
							<Col span={24}>
								<p className="playlist-type text-white">
									{t('Public playlist')}
								</p>
								<h1 className="playlist-title" title={playlistName}>
									{playlistName}
								</h1>
								{playlist.description && (
									<p className="playlist-description text-white">
										{cvt(playlist.description)}
									</p>
								)}
							</Col>
							<Col span={24}>
								<Space className="owner">
									<Link to="/profile">
										<img
											className="playlist-avatar"
											id="user-avatar"
											alt="User Avatar"
											src={`/images/profile.jpg`}
										/>
									</Link>
									<h3 className="playlist-owner text-sm font-semibold text-white">
										<Link className="link-text" to="/profile">
											#VInallywithADEK
										</Link>{' '}
										•{' '}
										<span className="songs-number">
											{displaySongCount} {t('songs')}
										</span>
									</h3>
								</Space>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
};

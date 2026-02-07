// Components
import { Col, Row } from 'antd';
import { PageHorizontal } from './PageHorizontal';

// Utils
import { useTranslation } from 'react-i18next';
import { FC, useState } from 'react';

// Redux
import { useAppSelector, useAppDispatch } from '../../store/store';
import { libraryActions } from '../../store/slices/library';

// Constants
import { pageSongs } from '../../constants/pages/songs';
import { playlists } from '../../constants/made-for';
import { biggerHitsPlaylists } from '../../constants/bigger-hits';

// Interfaces
import type { Playlist } from '../../interfaces/types';
import type { Song } from '../../interfaces/types';
import { PlaylistsSection } from './playlists';

interface HomeProps {
	playlists: Playlist[];
}

interface PlaylistListProps extends HomeProps {
	onSetColor: (color: string) => void;
}

const HorizontalPlaylists: FC<PlaylistListProps> = () => {
	const dispatch = useAppDispatch();

	// Use songs: Welcome, Groom, Bride, See You There
	const displaySongs = pageSongs;

	const handleClick = (song: Song) => {
		dispatch(libraryActions.setSongPlaying(song));
	};

	return (
		<Row
			gutter={[10, 10]}
			className="horizontal-playlists-row"
			justify="space-between"
		>
			{displaySongs.map((song, index) => {
				return (
					<Col 
						key={song.name} 
						xs={12} 
						md={12} 
						xl={6}
						className={`horizontal-playlist-item horizontal-playlist-item-${index}`}
						data-song-name={song.name.toLowerCase().replace(/\s+/g, '-')}
					>
						<PageHorizontal song={song} onClick={() => handleClick(song)} />
					</Col>
				);
			})}
		</Row>
	);
};

const Playlists: FC<PlaylistListProps> = () => {
	const { t } = useTranslation(['home']);
	const guestName = useAppSelector((state) => state.guest.name);
	const displayName = guestName || 'Bapak/Ibu/Saudara/i';

	return (
		<div className="home">
			<PlaylistsSection title={`${t('Made for')} ${displayName}`} />
		</div>
	);
};

const BiggestHitsPlaylists: FC<PlaylistListProps> = () => {
	const { t } = useTranslation(['home']);

	return (
		<div className="home">
			<PlaylistsSection title={t('Biggest Hits')} playlists={biggerHitsPlaylists} hideCardInfo={true} />
		</div>
	);
};

const Home = () => {
	const [color, setColor] = useState('rgb(66, 32, 35)');
	return (
		<div
			className="Home-seccion"
			style={{
				transition: 'background: 0.5s',
				background: `linear-gradient(180deg, ${color} -20%, rgb(18, 18, 18) 50%)`,
			}}
		>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<HorizontalPlaylists playlists={playlists} onSetColor={setColor} />
				</Col>
				<Col span={24}>
					<Playlists playlists={playlists} onSetColor={setColor} />
				</Col>
				<Col span={24}>
					<BiggestHitsPlaylists playlists={biggerHitsPlaylists} onSetColor={setColor} />
				</Col>
			</Row>
		</div>
	);
};

export default Home;

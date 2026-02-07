import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

import { bridePage } from '../../constants/pages/bride';
import { groomPage } from '../../constants/pages/groom';
import { brideSong, groomSong } from '../../constants/pages/songs';
import { useAppDispatch } from '../../store/store';
import { libraryActions } from '../../store/slices/library';
import type { Playlist } from '../../interfaces/types';
import { PlaylistHorizontal } from '../Home/PlaylistHorizontal';

const groomPlaylist: Playlist = {
	name: groomPage.title,
	color: groomPage.color,
	songs: [groomSong],
	getImage: () => groomPage.image ?? '',
};

const bridePlaylist: Playlist = {
	name: bridePage.title,
	color: bridePage.color,
	songs: [brideSong],
	getImage: () => bridePage.image ?? '',
};

const STAT_ICONS: Record<string, string> = {
	years: '📅',
	trips: '✈️',
	lateNight: '🌙',
	arguments: '⚔️',
	food: '🏆',
};

export const ProfileBody = () => {
	const { t } = useTranslation(['profile']);
	const dispatch = useAppDispatch();

	const handleViewPage = (song: typeof brideSong) => () => {
		dispatch(libraryActions.setSongPlaying(song));
	};

	return (
		<div className="profile-body">
			<h3 className="about-me-title">{t('About us')}</h3>
			<Row gutter={[10, 10]} className="profile-related-row" justify="start">
				<Col xs={12} md={10} xl={8} className="profile-related-col">
					<PlaylistHorizontal
						playlist={groomPlaylist}
						onClick={handleViewPage(groomSong)}
					/>
				</Col>
				<Col xs={12} md={10} xl={8} className="profile-related-col">
					<PlaylistHorizontal
						playlist={bridePlaylist}
						onClick={handleViewPage(brideSong)}
					/>
				</Col>
			</Row>
			<div className="about-me-text">
				{t('About us description')
					.split('\n')
					.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
			</div>

			<h3 className="about-me-title">{t('Stats')}</h3>
			<div className="profile-stats">
				<div className="profile-stat profile-stat--default">
					<span className="profile-stat__icon" aria-hidden>
						{STAT_ICONS.years}
					</span>
					<span className="profile-stat__label">{t('Years together')}</span>
					<span className="profile-stat__value">{t('Years value')}</span>
				</div>
				<div className="profile-stat profile-stat--default">
					<span className="profile-stat__icon" aria-hidden>
						{STAT_ICONS.trips}
					</span>
					<span className="profile-stat__label">{t('Coffee time')}</span>
					<span className="profile-stat__value">222.514</span>
				</div>
				<div className="profile-stat profile-stat--default">
					<span className="profile-stat__icon" aria-hidden>
						{STAT_ICONS.lateNight}
					</span>
					<span className="profile-stat__label">{t('Late night talks')}</span>
					<span className="profile-stat__value ">{t('Late night value')}</span>
				</div>
				<div className="profile-stat profile-stat--default">
					<span className="profile-stat__icon" aria-hidden>
						{STAT_ICONS.arguments}
					</span>
					<span className="profile-stat__label">{t('Arguments won')}</span>
					<div className="profile-stat__vs">
						<span className="profile-stat__value">1</span>
						<span className="profile-stat__vs-divider">vs</span>
						<span className="profile-stat__value">99999999</span>
					</div>
				</div>
				<div className="profile-stat profile-stat--default">
					<span className="profile-stat__icon" aria-hidden>
						{STAT_ICONS.food}
					</span>
					<span className="profile-stat__label">{t('Favorite sport')}</span>
					<div className="profile-stat__vs">
						<span className="profile-stat__value">💪</span>
						<span className="profile-stat__vs-divider">vs</span>
						<span className="profile-stat__value">🏃</span>
					</div>
				</div>
			</div>
		</div>
	);
};

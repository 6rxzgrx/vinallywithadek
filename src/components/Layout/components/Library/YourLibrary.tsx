// Icons
import { CloseIcon, LibraryCollapsedIcon, LibraryIcon } from '../../../Icons';

// Utils
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Space } from 'antd';
import { Tooltip } from '../../../Tooltip';
import PlaylistCardShort from './PlaylistCardShort';

// I18n
import { LanguageButton } from './Language';
import { useTranslation } from 'react-i18next';

// Redux
import { libraryActions } from '../../../../store/slices/library';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Interfaces
import type { Playlist } from '../../../../interfaces/types';

const Title = memo(() => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation(['navbar']);
	const collapsed = useAppSelector((state) => state.library.collapsed);

	if (collapsed) {
		return (
			<Tooltip placement="right" title={t('Expand your library')}>
				<button
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
					onClick={() => dispatch(libraryActions.toggleLibrary())}
				>
					<LibraryCollapsedIcon />
				</button>
			</Tooltip>
		);
	}

	return (
		<div style={{ paddingLeft: '8px' }}>
			<Space wrap>
				<Tooltip placement="top" title={t('Collapse your library')}>
					<button onClick={() => dispatch(libraryActions.toggleLibrary())}>
						<LibraryIcon />
					</button>
				</Tooltip>
				<span className="Navigation-button">{t('Your Library')}</span>
			</Space>
		</div>
	);
});

const YourLibrary = ({ playlists }: { playlists: Playlist[] }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const collapsed = useAppSelector((state) => state.library.collapsed);

	const onClick = useCallback(
		(url: string) => {
			navigate(`/playlist/${url}`);
		},
		[navigate]
	);

	const handlePlaylistClick = useCallback(
		(url: string) => {
			onClick(url);
			// Auto-close library on mobile when playlist is clicked
			if (window.innerWidth <= 768) {
				dispatch(libraryActions.collapseLibrary());
			}
		},
		[onClick, dispatch]
	);

	return (
		<div className={`Navigation-section library ${!collapsed ? 'open' : ''}`}>
			{/* Mobile Close Button */}
			<button
				className="library-mobile-close-button"
				onClick={() => dispatch(libraryActions.collapseLibrary())}
				aria-label="Close library"
			>
				<CloseIcon />
			</button>

			<Title />

			<div className="library-list-container">
				<div className="library-playlists-wrapper">
					<div className="library-playlists-scroll">
						{playlists.map((playlist: Playlist) => {
							return (
								<PlaylistCardShort
									key={playlist.name}
									playlist={playlist}
									onClick={() => {
										handlePlaylistClick(playlist.name.toLowerCase());
									}}
								/>
							);
						})}
					</div>
				</div>
				<div className="library-language-button">
					<LanguageButton />
				</div>
			</div>
		</div>
	);
};

export default YourLibrary;

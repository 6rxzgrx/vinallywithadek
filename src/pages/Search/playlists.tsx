import { FC, useCallback } from 'react';
import PlaylistCard from '../Home/PlaylistCard';

// Utils
import { useNavigate } from 'react-router-dom';

// Interfaces
import type { Playlist } from '../../interfaces/types';

interface SearchPlaylistsSectionProps {
	title: string;
	playlists: Playlist[];
	hideCardInfo?: boolean;
}

export const SearchPlaylistsSection: FC<SearchPlaylistsSectionProps> = (props) => {
	const navigate = useNavigate();

	const onClick = useCallback(
		(name: string) => {
			navigate(`/playlist/${name}`);
		},
		[navigate]
	);

	return (
		<div className="search-playlists-section">
			<h1 className="section-title">{props.title}</h1>
			<div className="search-playlists-grid">
				{props.playlists.map((playlist: Playlist) => {
					return (
						<div key={playlist.name}>
							<PlaylistCard
								playlist={playlist}
								onClick={() => onClick(playlist.name.toLowerCase())}
								hideInfo={props.hideCardInfo}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};


import { FC, useCallback } from 'react';
import PlaylistCard from './PlaylistCard';

// Utils
import { useNavigate } from 'react-router-dom';

// Constants
import { playlists } from '../../constants/made-for';

// Interfaces
import type { Playlist } from '../../interfaces/types';

interface PlaylistsSectionProps {
	title: string;
	playlists?: Playlist[];
	hideCardInfo?: boolean;
}

export const PlaylistsSection: FC<PlaylistsSectionProps> = (props) => {
	const navigate = useNavigate();
	const displayPlaylists = props.playlists || playlists;

	const onClick = useCallback(
		(name: string) => {
			navigate(`/playlist/${name}`);
		},
		[navigate]
	);

	return (
		<div className="playlists-section-container" style={{ marginBottom: '10px' }}>
			<h1 className="playlist-header">{props.title}</h1>
			<div className="grid grid-cols-3 xxs:grid-cols-3 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
				{displayPlaylists.map((playlist: Playlist) => {
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

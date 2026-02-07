import { FC } from 'react';
import { PlayCircle } from './PlayCircle';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/store';
import type { Playlist } from '../../interfaces/types';

interface PlaylistHorizontalProps {
	playlist: Playlist;
	onClick: () => void;
}

export const PlaylistHorizontal: FC<PlaylistHorizontalProps> = ({
	playlist,
	onClick,
}) => {
	const { t } = useTranslation(['cv']);
	const language = useAppSelector((state) => state.language.language);
	const title = t(playlist.name);

	return (
		<div
			className="horizontal-playlist-link"
			style={{ cursor: 'pointer' }}
			onClick={onClick}
		>
			<div className="horizontal-playlist">
				<Space>
					<img
						width="60"
						src={playlist.getImage(language)}
						alt="album cover"
					></img>
					<h3 className="text-md font-semibold text-white">{title}</h3>
				</Space>
				<PlayCircle />
			</div>
		</div>
	);
};

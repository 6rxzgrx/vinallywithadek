import { FC } from 'react';
import { PlayCircle } from './PlayCircle';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Song } from '../../interfaces/types';

interface PageHorizontalProps {
	song: Song;
	onClick: () => void;
}

export const PageHorizontal: FC<PageHorizontalProps> = ({ song, onClick }) => {
	const { t } = useTranslation(['cv']);
	const title = t(song.name);

	return (
		<div
			className="horizontal-playlist-link"
			style={{ cursor: 'pointer' }}
			onClick={onClick}
		>
			<div className="horizontal-playlist">
				<Space style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
					<img
						width="60"
						src={song.imageUrl || '/images/default.jpeg'}
						alt={title}
						style={{ flexShrink: 0 }}
					></img>
					<h3
						className="text-md font-semibold text-white"
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							flexShrink: 1,
							minWidth: 0,
						}}
					>
						{title}
					</h3>
				</Space>
				<PlayCircle />
			</div>
		</div>
	);
};

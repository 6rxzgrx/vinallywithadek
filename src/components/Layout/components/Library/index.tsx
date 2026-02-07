import { Col, Row } from 'antd';

import YourLibrary from './YourLibrary';

// Constants
import { biggerHitsPlaylists } from '../../../../constants/bigger-hits';

// Interfaces
import type { FC } from 'react';
import type { Playlist } from '../../../../interfaces/types';

interface LibraryProps {
	playlists: Playlist[];
}

export const Library: FC<LibraryProps> = ({ playlists = [] }) => {
	// Combine made-for playlists with bigger hits playlists
	const allPlaylists = [...playlists, ...biggerHitsPlaylists];

	return (
		<Row gutter={[8, 8]}>
			<Col span={24}>
				<YourLibrary playlists={allPlaylists} />
			</Col>
		</Row>
	);
};

export default Library;

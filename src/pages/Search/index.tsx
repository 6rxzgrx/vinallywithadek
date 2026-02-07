import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Col, Row, Input } from 'antd';
import { SearchIcon, BrowseIcon } from '../../components/Icons';
import { TopResult } from './topResult';
import { SearchedSongs } from './songs';
import NoSearchResults from './noResults';
import { SearchPlaylistsSection } from './playlists';

// Constants
import { playlists } from '../../constants/made-for';
import { biggerHitsPlaylists } from '../../constants/bigger-hits';

const data = [...playlists, ...biggerHitsPlaylists]
	.map((playlist) =>
		playlist.songs.map((s) => ({ ...s, playlist: playlist.name }))
	)
	.flat();

export type SearchResult = (typeof data)[number];

const searchableKeys: (keyof SearchResult)[] = [
	'name',
	'artist',
	'playlist',
	'description',
];

export const SearchPage = () => {
	const { t } = useTranslation(['cv', 'search', 'navbar']);
	const navigate = useNavigate();
	const params = useParams<{ search?: string }>();
	const [items, setItems] = useState<SearchResult[]>([]);
	const [searchValue, setSearchValue] = useState<string>(params.search || '');
	
	const allPlaylists = [...playlists, ...biggerHitsPlaylists];
	const [matchedPlaylists, setMatchedPlaylists] = useState<typeof allPlaylists>([]);

	useEffect(() => {
		// Update search value from URL params
		if (params.search !== undefined) {
			const decodedSearch = decodeURIComponent(params.search);
			setSearchValue(decodedSearch);
		} else {
			setSearchValue('');
		}
	}, [params.search]);

	useEffect(() => {
		if (params.search) {
			const search = params.search.toLowerCase();
			const results = data.filter((item) =>
				searchableKeys.some(
					(key) =>
						t(item[key] || '', { ns: 'cv' })
							.toLowerCase()
							.includes(search) ||
						item.skills.some((skill) =>
							skill.text.toLowerCase().includes(search)
						)
				)
			);

			setItems(results);

			// Get unique playlists that contain matching songs
			const uniquePlaylistNames = [...new Set(results.map((item) => item.playlist))];
			const filteredPlaylists = allPlaylists.filter((playlist) =>
				uniquePlaylistNames.includes(playlist.name)
			);
			setMatchedPlaylists(filteredPlaylists);
		} else {
			// No search query - show all playlists
			setItems([]);
			setMatchedPlaylists([]);
		}
	}, [params.search, t]);

	const handleSearchChange = (value: string) => {
		setSearchValue(value);
		if (value === '') {
			navigate('/search');
		} else {
			navigate(`/search/${encodeURIComponent(value)}`);
		}
	};

	const hasSearchResults = params.search && params.search.trim() !== '' && items.length > 0;
	const showNoResults = params.search && params.search.trim() !== '' && items.length === 0;

	return (
		<div className="Search-Page">
			{/* Mobile Search Input */}
			<div className="mobile-search-input">
				<Input
					size="large"
					className="search-input"
					prefix={<SearchIcon />}
					suffix={<BrowseIcon />}
					value={searchValue}
					placeholder={t('SearchPlaceholder', { ns: 'navbar' })}
					onChange={(e) => handleSearchChange(e.target.value)}
				/>
			</div>

			{hasSearchResults ? (
				<Row gutter={[16, 16]}>
					<Col span={24} lg={9}>
						<TopResult item={items[0]} />
					</Col>

					<Col span={24} lg={15}>
						<SearchedSongs songs={items.slice(0, 4)} />
					</Col>

					<Col span={24}>
						<SearchPlaylistsSection 
							title={t('Playlists', { ns: 'search' })} 
							playlists={matchedPlaylists.length > 0 ? matchedPlaylists : allPlaylists}
						/>
					</Col>
				</Row>
			) : showNoResults ? (
				<NoSearchResults searchValue={params.search || ''} />
			) : (
				<SearchPlaylistsSection 
					title={t('Playlists', { ns: 'search' })} 
					playlists={allPlaylists}
				/>
			)}
		</div>
	);
};

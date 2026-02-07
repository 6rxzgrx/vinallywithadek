import { useNavigate } from 'react-router-dom';
import { HomeIcon, LibraryIcon, SearchIcon } from '../../../Icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { libraryActions } from '../../../../store/slices/library';

export const MobileMenu = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [t] = useTranslation(['playingBar']);

	return (
		<footer className="mobile-menu">
			<button
				onClick={() => {
					navigate('/');
				}}
			>
				<HomeIcon />
				<p>{t('Home')}</p>
			</button>
			<button
				onClick={() => {
					navigate('/search/');
				}}
			>
				<SearchIcon />
				<p>{t('Search')}</p>
			</button>
			<button onClick={() => dispatch(libraryActions.toggleLibrary())}>
				<LibraryIcon />
				<p>{t('Your Library')}</p>
			</button>
		</footer>
	);
};

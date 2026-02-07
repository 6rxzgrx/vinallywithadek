import './styles/App.scss';

// Utils
import i18next from 'i18next';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';

// Components
import { ConfigProvider } from 'antd';
import { AppLayout } from './components/Layout';
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { libraryActions } from './store/slices/library';
import { guestActions } from './store/slices/guest';
import { playingBarActions } from './store/slices/playingBar';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store, useAppSelector } from './store/store';
import { SearchPage } from './pages/Search';
import { prefetchWishes } from './constants/made-for/weddingwish';

// Pages
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Page404 = lazy(() => import('./pages/404'));
const Profile = lazy(() => import('./pages/Profile'));
const PlaylistView = lazy(() => import('./pages/Playlist'));

window.addEventListener('resize', () => {
	const vh = window.innerWidth;
	if (vh < 950) {
		store.dispatch(libraryActions.collapseLibrary());
	}
});

// localStorage utilities with expiration
const STORAGE_EXPIRY_TIME = 10 * 60 * 1000; // 15 minutes in milliseconds

interface StorageData {
	value: string;
	timestamp: number;
}

const setItemWithExpiry = (
	key: string,
	value: string,
	expiryTime: number = STORAGE_EXPIRY_TIME
) => {
	const item: StorageData = {
		value,
		timestamp: Date.now() + expiryTime,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiry = (key: string): string | null => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}

	try {
		const item: StorageData = JSON.parse(itemStr);
		const now = Date.now();

		// Check if item has expired
		if (now > item.timestamp) {
			// Item has expired, remove it
			localStorage.removeItem(key);
			return null;
		}

		return item.value;
	} catch (e) {
		// If parsing fails, treat as expired/invalid and remove it
		localStorage.removeItem(key);
		return null;
	}
};

// Component to monitor 'to' query parameter on all routes
const QueryParamMonitor = () => {
	const location = useLocation();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const toParam = urlParams.get('to');

		if (toParam) {
			// Decode the URL-encoded value
			const decodedName = decodeURIComponent(toParam);
			store.dispatch(guestActions.setGuestName({ name: decodedName }));
			// Save to localStorage with expiration
			setItemWithExpiry('guestName', decodedName);
		} else {
			// If no query parameter, check localStorage
			const savedGuestName = getItemWithExpiry('guestName');
			if (savedGuestName) {
				store.dispatch(guestActions.setGuestName({ name: savedGuestName }));
			}
		}
	}, [location.search]);

	return null;
};

const RootComponent = () => {
	const container = useRef<HTMLDivElement | null>(null);
	const language = useAppSelector((state) => state.language.language);
	const [showLogin, setShowLogin] = useState(true);

	// Prefetch wishes on first app open so Wedding Wish page doesn't show loading
	useEffect(() => {
		prefetchWishes();
	}, []);

	// Check localStorage for login state on mount and read initial 'to' parameter
	useEffect(() => {
		const isLoggedIn = getItemWithExpiry('isLoggedIn') === 'true';
		setShowLogin(!isLoggedIn);

		// Read 'to' query parameter from URL on initial load
		const urlParams = new URLSearchParams(window.location.search);
		const toParam = urlParams.get('to');

		if (toParam) {
			// Decode the URL-encoded value
			const decodedName = decodeURIComponent(toParam);
			store.dispatch(guestActions.setGuestName({ name: decodedName }));
			// Save to localStorage with expiration
			setItemWithExpiry('guestName', decodedName);
		} else {
			// If no query parameter, check localStorage
			const savedGuestName = getItemWithExpiry('guestName');
			if (savedGuestName) {
				store.dispatch(guestActions.setGuestName({ name: savedGuestName }));
			}
		}
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('lang', language);
		i18next.changeLanguage(language);
	}, [language]);

	// Global effect to ensure all modal containers have dark background (matching login modal)
	useEffect(() => {
		const updateModalContainers = () => {
			const modalContainers = document.querySelectorAll('.ant-modal-container');
			modalContainers.forEach((container) => {
				const element = container as HTMLElement;
				// Force dark background for all modal containers (matching login modal #121212)
				if (element.style.background !== 'rgb(18, 18, 18)' && 
				    element.style.background !== '#121212') {
					element.style.background = '#121212';
					element.style.backgroundColor = '#121212';
				}
			});
		};

		// Initial check
		updateModalContainers();

		// Watch for modal containers being added/removed
		const observer = new MutationObserver(() => {
			updateModalContainers();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Also check periodically to catch any missed updates
		const interval = setInterval(updateModalContainers, 100);

		return () => {
			observer.disconnect();
			clearInterval(interval);
		};
	}, []);

	// Handle login and save to localStorage
	const handleLogin = () => {
		setItemWithExpiry('isLoggedIn', 'true');

		// Save guest name to localStorage if available from query parameter or Redux store
		const urlParams = new URLSearchParams(window.location.search);
		const toParam = urlParams.get('to');

		if (toParam) {
			const decodedName = decodeURIComponent(toParam);
			setItemWithExpiry('guestName', decodedName);
			store.dispatch(guestActions.setGuestName({ name: decodedName }));
		} else {
			// Check if guest name is already in Redux store (from initial load)
			const currentGuestName = store.getState().guest.name;
			if (currentGuestName) {
				setItemWithExpiry('guestName', currentGuestName);
			}
		}

		setShowLogin(false);

		// Start audio playback automatically after successful login
		// This works because it's triggered immediately after user interaction (login button click)
		setTimeout(() => {
			store.dispatch(playingBarActions.setPlaying());
		}, 100); // Small delay to ensure app layout is rendered
	};

	const routes = [
		{ path: '', element: <Home /> },
		{ path: '/profile', element: <Profile /> },
		{ path: '/search', element: <SearchPage /> },
		{ path: '/search/:search', element: <SearchPage /> },
		{
			path: '/playlist/:playlistId',
			element: <PlaylistView container={container} />,
		},
		{ path: '*', element: <Page404 /> },
	];

	return (
		<Router basename="/">
			<QueryParamMonitor />
			{/* Show only Login page when not logged in */}
			{showLogin ? (
				<Suspense>
					<Login onLogin={handleLogin} />
				</Suspense>
			) : (
				/* Show main app after login */
				<AppLayout>
					<div className="Main-section" ref={container}>
						<div style={{ minHeight: 'calc(100vh - 230px)', width: '100%' }}>
							<Routes>
								{routes.map((route) => (
									<Route
										key={route.path}
										path={route.path}
										element={<Suspense>{route.element}</Suspense>}
									/>
								))}
							</Routes>
						</div>
					</div>
				</AppLayout>
			)}
		</Router>
	);
};

function App() {
	return (
		<ConfigProvider theme={{ token: { fontFamily: 'SpotifyMixUI' } }}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RootComponent />
				</PersistGate>
			</Provider>
		</ConfigProvider>
	);
}

export default App;

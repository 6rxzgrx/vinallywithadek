import { FC } from 'react';
import './styles.scss';

export const AppLoader: FC = () => {
	return (
		<div className="app-loader" role="status" aria-label="Loading">
			<div className="app-loader__spinner" />
			<p className="app-loader__text">Loading...</p>
		</div>
	);
};

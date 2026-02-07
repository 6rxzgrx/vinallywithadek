import { FC, useState } from 'react';
import { useAppSelector } from '../../store/store';
import './styles.scss';

interface LoginProps {
	onLogin: () => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
	const [password, setPassword] = useState('');
	const guestName = useAppSelector((state) => state.guest.name);
	const username = guestName || 'Bapak/Ibu/Saudara/i';
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const handleLogin = () => {
		// Validate password
		if (password === '1234') {
			setError('');
			// Hide login overlay after successful login
			onLogin();
		} else {
			setError('Incorrect password. Please try again.');
		}
	};

	const handleForgotPassword = () => {
		setShowForgotPasswordModal(true);
	};

	const handleCloseModal = () => {
		setShowForgotPasswordModal(false);
	};

	return (
		<div className="login-wrapper">
			<div className="login-container">
				{/* Logo */}
				<div className="login-logo">
					<img
						src="/images/invitation-logo.svg"
						alt="Invitation Logo"
						className="login-logo-svg"
						style={{ filter: 'brightness(0) invert(1)' }}
					/>
				</div>

				{/* Welcome back text */}
				<h1 className="login-title">Welcome back, {username}</h1>

				{/* Information message */}
				<div className="login-info">
					<div className="login-info-icon">
						<img src="/images/info.svg" alt="Info" className="login-info-svg" />
					</div>
					<p className="login-info-text">
						Youre invited to the wedding of <b>Adek & Vivi</b> on 14th of
						February 2026 in <b>Kesamben,Blitar, Indonesia</b>. You can access our
						invitation here with the correct password.
					</p>
				</div>

				{/* Password input */}
				<div className="login-input-wrapper">
					<label className="login-input-label">Password</label>
					<div className="login-input-container">
						<input
							type={showPassword ? 'text' : 'password'}
							className={`login-input ${error ? 'login-input-error' : ''}`}
							placeholder=""
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setError(''); // Clear error when user types
							}}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									handleLogin();
								}
							}}
						/>
						<button
							type="button"
							className={`login-password-toggle ${isAnimating ? 'bounce' : ''}`}
							onClick={() => {
								setIsAnimating(true);
								setShowPassword(!showPassword);
								setTimeout(() => setIsAnimating(false), 300);
							}}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{showPassword ? (
								// Open eye icon (when password is visible)
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									role="img"
									aria-hidden="true"
								>
									<path
										d="M6.703 7.382A6.1 6.1 0 0 0 6.113 10c0 3.292 2.614 6 5.887 6s5.886-2.708 5.886-6c0-.936-.211-1.825-.589-2.618.573.341 1.115.744 1.634 1.204.674.596 1.77 1.793 2.683 3.414-.913 1.62-2.01 2.818-2.683 3.414C17.037 17.093 14.833 18 12 18s-5.037-.907-6.931-2.586c-.674-.596-1.77-1.793-2.683-3.414.913-1.62 2.01-2.818 2.683-3.414q.777-.691 1.634-1.204M12 4C8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453C5.996 18.908 8.672 20 12 20c3.329 0 6.004-1.091 8.258-3.089.896-.794 2.3-2.353 3.38-4.453l.237-.458-.236-.458c-1.082-2.1-2.485-3.659-3.381-4.453C18.004 5.09 15.328 4 12 4m0 2c2.125 0 3.886 1.77 3.886 4S14.125 14 12 14s-3.886-1.77-3.886-4S9.875 6 12 6"
										fill="white"
										fillOpacity="0.7"
									/>
								</svg>
							) : (
								// Closed eye icon with slash (when password is hidden)
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M22.207 2.824a1 1 0 1 0-1.414-1.414L17.15 5.053C15.621 4.363 13.92 4 12 4 8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453q.417.37.853.697L1.793 20.41a1 1 0 1 0 1.414 1.414l3.126-3.126.003.002 1.503-1.503-.004-.001 1.73-1.73.004.001 1.567-1.567h-.004l4.68-4.681.001.004 1.595-1.595-.002-.003.11-.109.002.002 1.444-1.444-.003-.002zM14.884 7.32l-5.57 5.57A4.04 4.04 0 0 1 8.113 10c0-2.23 1.761-4 3.886-4 1.137 0 2.17.506 2.884 1.319zM7.9 14.304l-1.873 1.873a11 11 0 0 1-.957-.763C4.396 14.818 3.3 13.621 2.387 12c.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204A6.1 6.1 0 0 0 6.113 10c0 1.681.682 3.21 1.786 4.304zm11.568-5.2 1.415-1.415a16.5 16.5 0 0 1 2.756 3.853l.236.458-.236.458c-1.082 2.1-2.485 3.659-3.381 4.453C18.004 18.908 15.328 20 12 20a13.2 13.2 0 0 1-3.08-.348l1.726-1.726q.652.075 1.354.074c2.833 0 5.037-.907 6.931-2.586.674-.596 1.77-1.793 2.683-3.414a14.5 14.5 0 0 0-2.146-2.896"
										fill="white"
										fillOpacity="0.7"
									/>
									<path
										d="M17.843 10.729c-.328 2.755-2.494 4.956-5.24 5.24z"
										fill="white"
										fillOpacity="0.7"
									/>
								</svg>
							)}
						</button>
					</div>
					{error && <div className="login-error">{error}</div>}
				</div>

				{/* Login button */}
				<button className="login-button" onClick={handleLogin}>
					Login
				</button>

				{/* Forgot password link */}
				<button
					className="login-forgot-password"
					onClick={handleForgotPassword}
				>
					Forgot your Password?
				</button>
			</div>

			{/* Forgot Password Modal */}
			{showForgotPasswordModal && (
				<div className="login-modal-overlay" onClick={handleCloseModal}>
					<div className="login-modal" onClick={(e) => e.stopPropagation()}>
						<button
							className="login-modal-close"
							onClick={handleCloseModal}
							aria-label="Close modal"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18 6L6 18M6 6l12 12"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<h2 className="login-modal-title">Forgot Password?</h2>
						<div className="login-modal-content">
							<p className="login-modal-text">Your password is:</p>
							<div className="login-modal-password">1234</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;

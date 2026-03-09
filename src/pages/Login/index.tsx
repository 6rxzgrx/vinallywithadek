import { FC, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { languageActions } from '../../store/slices/language';
import './styles.scss';
import { getImagePublicPath } from '@/utils/getPublicPath';

interface LoginProps {
	onLogin: () => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
	const { t } = useTranslation(['login']);
	const dispatch = useAppDispatch();
	const [credential, setCredential] = useState('');
	const guestName = useAppSelector((state) => state.guest.name);
	const username = guestName || t('Bapak/Ibu/Saudara/i');
	const [error, setError] = useState('');
	const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

	const handleLogin = () => {
		if (credential.trim() === '140426') {
			setError('');
			onLogin();
		} else {
			setError(t('Incorrect password. Please try again.'));
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
				<div className="login-logo">
					<img
						src={getImagePublicPath('invitation-logo.svg')}
						alt={t('Invitation Logo')}
						className="login-logo-svg"
						style={{ filter: 'brightness(0) invert(1)' }}
					/>
				</div>

				<h1 className="login-title">
					{t('Welcome back')}, {username}
				</h1>

				<div className="login-info">
					<div className="login-info-icon">
						<img
							src={getImagePublicPath('info.svg')}
							alt={t('Info')}
							className="login-info-svg"
						/>
					</div>
					<p className="login-info-text">
						<Trans
							i18nKey="login:invitationInfo"
							values={{
								brideGroom: t('brideGroom'),
								date: t('date'),
								location: t('location'),
							}}
							components={[<b key="bride" />, <b key="location" />]}
						/>
					</p>
				</div>

				<div className="login-input-wrapper">
					<label className="login-input-label">{t('Password')}</label>
					<div className="login-input-container">
						<input
							type="password"
							className={`login-input ${error ? 'login-input-error' : ''}`}
							placeholder=""
							value={credential}
							onChange={(e) => {
								setCredential(e.target.value);
								setError('');
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleLogin();
								}
							}}
						/>
					</div>
					{error && <div className="login-error">{error}</div>}
				</div>

				<button className="login-button" onClick={handleLogin}>
					{t('Login')}
				</button>

				<button className="login-forgot-password" onClick={handleForgotPassword}>
					{t('Forgot your Password?')}
				</button>

				<button
					className="login-language-button"
					onClick={() => dispatch(languageActions.openLanguageModal())}
					aria-label={t('Select language')}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
							fill="currentColor"
						/>
					</svg>
					<span>{t('Select language')}</span>
				</button>

				<p className="login-footer-captcha">
					This site is protected by reCAPTCHA and the Google{' '}
					<a
						href="https://policies.google.com/privacy"
						target="_blank"
						rel="noreferrer"
					>
						Privacy Policy
					</a>{' '}
					and{' '}
					<a
						href="https://policies.google.com/terms"
						target="_blank"
						rel="noreferrer"
					>
						Terms of Service
					</a>{' '}
					apply.
				</p>
			</div>

			{showForgotPasswordModal && (
				<div className="login-modal-overlay" onClick={handleCloseModal}>
					<div className="login-modal" onClick={(e) => e.stopPropagation()}>
						<button
							className="login-modal-close"
							onClick={handleCloseModal}
							aria-label={t('Close modal')}
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
						<h2 className="login-modal-title">{t('Forgot Password?')}</h2>
						<div className="login-modal-content">
							<p className="login-modal-text">{t('Your password is:')}</p>
							<div className="login-modal-password">140426</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;

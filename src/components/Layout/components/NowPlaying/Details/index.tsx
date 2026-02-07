import { Avatar, Image, Space, Button } from 'antd';
import { NowPlayingCard } from './card';
import { Tooltip } from '../../../../Tooltip';
import { useAppSelector, useAppDispatch } from '../../../../../store/store';
import { playingBarActions } from '../../../../../store/slices/playingBar';

import { NowPlayingLayout } from '../layout';
import { useTranslation } from 'react-i18next';

// Interfaces
import type { FC } from 'react';
import { useState } from 'react';
import type { Song } from '../../../../../interfaces/types';
import ReactPlayer from 'react-player';
import { Spin } from 'antd';

import { FaInstagram, FaLink, FaCopy } from 'react-icons/fa6';

import shuffle from 'lodash/shuffle';

import parse from 'html-react-parser';
import { RelatedSong } from './related';

const Profile: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['cv']);

	const hasButtons = song.link || song.instagram;

	return (
		<NowPlayingCard
			title={t(song.name)!}
			subtitle={t(song.artist || '')}
			image={song.imageUrl}
		>
			{song.explanation
				? t(song.explanation || '')
						.split('\n')
						.map((bullet, index) => (
							<div className="playing-now-card-body" key={index}>
								{parse(bullet)}
							</div>
						))
				: null}
			{hasButtons ? (
				<Space style={{ marginTop: 10 }}>
					{song.link ? (
						<Tooltip title={t('WEB_SITE')} placement="top">
							<a
								target={'_blank'}
								href={song.link}
								className="link-social-button"
								rel="noreferrer"
							>
								<FaLink />
							</a>
						</Tooltip>
					) : null}

					{song.instagram ? (
						<Tooltip title={t('Instagram')} placement="top">
							<a
								target={'_blank'}
								href={song.instagram}
								className="link-social-button"
								rel="noreferrer"
							>
								<FaInstagram />
							</a>
						</Tooltip>
					) : null}
				</Space>
			) : null}
		</NowPlayingCard>
	);
};

const Experience: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['playingBar']);
	const [tcv] = useTranslation(['cv']);

	if (!song.experience) return null;

	return (
		<NowPlayingCard title={t('Experience')}>
			{tcv(song.experience)
				.split('\n')
				.map((bullet, index) => (
					<div className="playing-now-card-body" key={index}>
						{bullet}
					</div>
				))}
		</NowPlayingCard>
	);
};

const Description: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['playingBar']);
	const [tcv] = useTranslation(['cv']);

	if (!song.description) return null;

	return (
		<NowPlayingCard title={t('Description')}>
			{tcv(song.description)
				.split('\n')
				.map((bullet, index) => (
					<div className="playing-now-card-body" key={index}>
						{parse(bullet)}
					</div>
				))}
		</NowPlayingCard>
	);
};

const Skills: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['playingBar']);

	if (!song.skills || !song.skills.length) return null;

	return (
		<NowPlayingCard title={t('Skills')}>
			{(song.skills || []).map((tag) => (
				<Tooltip title={tag.text} placement="top" key={tag.text}>
					<Avatar style={{ backgroundColor: '#5c5c5c26' }} icon={tag.icon} />
				</Tooltip>
			))}
		</NowPlayingCard>
	);
};

const Images: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['playingBar']);
	if (!song.images || !song.images.length) return null;

	return (
		<NowPlayingCard title={t('Images')}>
			<div style={{ position: 'relative', width: '100%' }}>
				<Image.PreviewGroup items={song.images}>
					<Image width={'100%'} src={song.images[0]} />
				</Image.PreviewGroup>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						pointerEvents: 'none',
					}}
				>
					<span
						style={{
							padding: '8px 12px',
							border: '1px solid rgba(255, 255, 255, 0.5) ',
							backgroundColor: 'rgba(0, 0, 0, 0.35) ',
							borderRadius: 4,
							color: 'rgba(255, 255, 255, 0.9)',
							fontSize: 14,
							textShadow: '0 1px 2px rgba(0,0,0,0.5)',
						}}
					>
						{t('Click to view more')}
					</span>
				</div>
			</div>
		</NowPlayingCard>
	);
};

const RelatedSongs: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['playingBar']);
	if (!song.relatedSongs || !song.relatedSongs.length) return null;

	return (
		<NowPlayingCard title={t('Related projects')}>
			{shuffle(song.relatedSongs)
				.slice(0, 3)
				.map((relatedSong) => (
					<RelatedSong key={relatedSong.name} song={relatedSong} />
				))}
		</NowPlayingCard>
	);
};

const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch {
		// Fallback for mobile / insecure context
	}
	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.setAttribute('readonly', '');
	textarea.style.position = 'fixed';
	textarea.style.left = '0';
	textarea.style.top = '0';
	textarea.style.width = '2em';
	textarea.style.height = '2em';
	textarea.style.padding = '0';
	textarea.style.border = 'none';
	textarea.style.outline = 'none';
	textarea.style.boxShadow = 'none';
	textarea.style.background = 'transparent';
	textarea.style.opacity = '0';
	textarea.style.fontSize = '12px';
	document.body.appendChild(textarea);
	textarea.focus();
	textarea.setSelectionRange(0, text.length);
	try {
		const ok = document.execCommand('copy');
		document.body.removeChild(textarea);
		return ok;
	} catch {
		document.body.removeChild(textarea);
		return false;
	}
};

const PaymentDetails: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['playingBar']);
	const [copied, setCopied] = useState(false);

	if (!song.paymentDetails) return null;

	const { accountNumber, accountName } = song.paymentDetails;

	const handleCopy = async () => {
		const ok = await copyToClipboard(accountNumber);
		if (ok) {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<NowPlayingCard title={t('Payment Details') || 'Payment Details'}>
			<div className="payment-details-container">
				<div className="payment-details-item">
					<div className="payment-details-content">
						<div className="payment-details-info">
							<div className="payment-details-label">Account Number</div>
							<div className="payment-details-account-number">
								{accountNumber}
							</div>
							<div className="payment-details-value">{accountName}</div>
						</div>
					</div>
					<Tooltip title={copied ? 'Copied!' : 'Copy account number'}>
						<Button
							type="text"
							icon={<FaCopy />}
							onClick={handleCopy}
							className={`copy-button ${copied ? 'copied' : ''}`}
						>
							{copied ? 'Copied!' : 'Copy'}
						</Button>
					</Tooltip>
				</div>
			</div>
		</NowPlayingCard>
	);
};

const SongPreview: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['playingBar']);

	// Use maps embed URL directly from song.maps property
	if (!song.maps) return null;

	return (
		<NowPlayingCard title={t('Song Preview')}>
			<div
				style={{
					width: '100%',
					height: '400px',
					borderRadius: '8px',
					overflow: 'hidden',
				}}
			>
				<iframe
					width="100%"
					height="100%"
					style={{ border: 0 }}
					loading="lazy"
					allowFullScreen
					referrerPolicy="no-referrer-when-downgrade"
					src={song.maps}
					title="Location Map"
				/>
			</div>
		</NowPlayingCard>
	);
};

const VideoPlayer: FC<{ song: Song }> = ({ song }) => {
	const [t] = useTranslation(['playingBar']);
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	const videoUrl = song.video;

	if (!videoUrl) return null;

	const onPlay = () => {
		dispatch(playingBarActions.setPause());
	};

	const onPause = () => {
		dispatch(playingBarActions.setPlaying());
	};

	const onEnded = () => {
		dispatch(playingBarActions.setPlaying());
	};

	const onReady = () => {
		setLoading(false);
	};

	return (
		<NowPlayingCard title={t('Video')}>
			<div
				style={{
					width: '100%',
					aspectRatio: '16 / 9',
					borderRadius: '8px',
					overflow: 'hidden',
					position: 'relative',
				}}
			>
				{loading && (
					<div
						style={{
							position: 'absolute',
							inset: 0,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: 'var(--bg-secondary, #1a1a1a)',
							zIndex: 1,
						}}
					>
						<Spin size="large" />
					</div>
				)}
				<ReactPlayer
					src={videoUrl}
					width="100%"
					height="100%"
					controls
					onPlay={onPlay}
					onPause={onPause}
					onEnded={onEnded}
					onReady={onReady}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				/>
			</div>
		</NowPlayingCard>
	);
};

export const Details = () => {
	const song = useAppSelector((state) => state.library.songPlaying);

	if (!song) return null;

	return (
		<NowPlayingLayout>
			<Profile song={song} />
			<Skills song={song} />
			<Description song={song} />
			<Experience song={song} />
			<Images song={song} />
			<VideoPlayer song={song} />
			<SongPreview song={song} />
			<PaymentDetails song={song} />
			<RelatedSongs song={song} />
		</NowPlayingLayout>
	);
};

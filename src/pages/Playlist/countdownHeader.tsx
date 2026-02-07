import { useEffect, useState, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { Playlist } from '../../interfaces/types';

interface CountdownHeaderProps {
	playlist: Playlist;
	targetDate?: Date; // Optional target date, defaults to a future date
}

// Notification icon component (Material Symbols style)
const NotificationIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
		style={{ display: 'block', color: '#121212' }}
	>
		<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
	</svg>
);

export const CountdownHeader: FC<CountdownHeaderProps> = ({
	playlist,
	targetDate,
}) => {
	const { t } = useTranslation(['playlist']);
	
	// Target date: April 14, 2026 at 7:30 AM
	// Memoize to prevent creating new Date object on every render
	const defaultTargetDate = useMemo(
		() => targetDate || new Date('2026-04-14T07:30:00'),
		[targetDate]
	);
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = new Date().getTime();
			const target = defaultTargetDate.getTime();
			const difference = target - now;

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
					minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
					seconds: Math.floor((difference % (1000 * 60)) / 1000),
				});
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			}
		};

		calculateTimeLeft();
		const interval = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(interval);
	}, [defaultTargetDate]);

	const formatNumber = (num: number) => {
		return num.toString().padStart(2, '0');
	};

	// Generate Google Calendar URL
	const getGoogleCalendarUrl = () => {
		const eventTitle = encodeURIComponent(t('Wedding Event Title'));
		const eventDate = defaultTargetDate;
		
		// Format date for Google Calendar (YYYYMMDDTHHMMSS)
		const formatDateForGoogle = (date: Date) => {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			const seconds = String(date.getSeconds()).padStart(2, '0');
			return `${year}${month}${day}T${hours}${minutes}${seconds}`;
		};

		// Start time (7:30 AM)
		const startDate = new Date(eventDate);
		// End time (assume event ends at 11:30 PM same day, or you can adjust)
		const endDate = new Date(eventDate);
		endDate.setHours(23, 30, 0, 0);

		const startDateStr = formatDateForGoogle(startDate);
		const endDateStr = formatDateForGoogle(endDate);
		
		const description = encodeURIComponent(t('Wedding Event Description'));
		const location = encodeURIComponent('Gedung Caraka Putra (GCP)'); 

		return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDateStr}/${endDateStr}&details=${description}&location=${location}`;
	};

	return (
		<div
			style={{
				height: 'calc(100vh - 150px)',
				width: '100%',
				overflow: 'auto',
				background: `linear-gradient(${playlist.color} -10%, #121212 35%)`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 'clamp(20px, 4vw, 40px) clamp(10px, 3vw, 20px)',
				position: 'relative',
				boxSizing: 'border-box',
			}}
		>
			{/* Main Title */}
			<h1
				style={{
					color: 'white',
					fontSize: 'clamp(24px, 5vw, 48px)',
					fontWeight: 'bold',
					marginBottom: 'clamp(24px, 5vw, 48px)',
					marginTop: 0,
					textAlign: 'center',
					fontFamily: 'system-ui, -apple-system, sans-serif',
					padding: '0 clamp(10px, 3vw, 20px)',
					flexShrink: 0,
					lineHeight: '1.2',
				}}
			>
				{playlist.name === 'almost there' ? t('Almost There') : playlist.name}
			</h1>

			{/* Countdown Timer */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 'clamp(8px, 2vw, 24px)',
					marginBottom: 'clamp(16px, 4vw, 32px)',
					flexWrap: 'nowrap',
					justifyContent: 'center',
					width: '100%',
					padding: '0 clamp(10px, 3vw, 20px)',
					flexShrink: 0,
					overflowX: 'auto',
					overflowY: 'hidden',
				}}
			>
				{/* Days */}
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
					<div
						style={{
							display: 'flex',
							height: 'clamp(60px, 12vw, 80px)',
							width: 'clamp(60px, 12vw, 80px)',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '16px',
							background: 'transparent',
							border: '2px solid rgba(255, 255, 255, 0.3)',
						}}
					>
						<p style={{ 
							color: 'white', 
							fontSize: 'clamp(20px, 4vw, 30px)', 
							fontWeight: 'bold', 
							letterSpacing: '-0.05em',
							margin: 0,
							lineHeight: '1',
						}}>
							{formatNumber(timeLeft.days)}
						</p>
					</div>
					<p style={{ 
						color: 'rgba(255, 255, 255, 0.7)', 
						fontSize: 'clamp(10px, 2vw, 12px)', 
						fontWeight: 'bold', 
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						margin: 0,
					}}>
						{t('Days')}
					</p>
				</div>

				<span style={{ 
					color: 'white', 
					fontSize: 'clamp(24px, 5vw, 36px)', 
					fontWeight: 'bold',
					paddingTop: '16px',
					flexShrink: 0,
					opacity: 0.7,
				}}>:</span>

				{/* Hours */}
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
					<div
						style={{
							display: 'flex',
							height: 'clamp(60px, 12vw, 80px)',
							width: 'clamp(60px, 12vw, 80px)',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '16px',
							background: 'transparent',
							border: '2px solid rgba(255, 255, 255, 0.3)',
						}}
					>
						<p style={{ 
							color: 'white', 
							fontSize: 'clamp(20px, 4vw, 30px)', 
							fontWeight: 'bold', 
							letterSpacing: '-0.05em',
							margin: 0,
							lineHeight: '1',
						}}>
							{formatNumber(timeLeft.hours)}
						</p>
					</div>
					<p style={{ 
						color: 'rgba(255, 255, 255, 0.7)', 
						fontSize: 'clamp(10px, 2vw, 12px)', 
						fontWeight: 'bold', 
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						margin: 0,
					}}>
						{t('Hours')}
					</p>
				</div>

				<span style={{ 
					color: 'white', 
					fontSize: 'clamp(24px, 5vw, 36px)', 
					fontWeight: 'bold',
					paddingTop: '16px',
					flexShrink: 0,
					opacity: 0.7,
				}}>:</span>

				{/* Minutes */}
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
					<div
						style={{
							display: 'flex',
							height: 'clamp(60px, 12vw, 80px)',
							width: 'clamp(60px, 12vw, 80px)',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '16px',
							background: 'transparent',
							border: '2px solid rgba(255, 255, 255, 0.3)',
						}}
					>
						<p style={{ 
							color: 'white', 
							fontSize: 'clamp(20px, 4vw, 30px)', 
							fontWeight: 'bold', 
							letterSpacing: '-0.05em',
							margin: 0,
							lineHeight: '1',
						}}>
							{formatNumber(timeLeft.minutes)}
						</p>
					</div>
					<p style={{ 
						color: 'rgba(255, 255, 255, 0.7)', 
						fontSize: 'clamp(10px, 2vw, 12px)', 
						fontWeight: 'bold', 
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						margin: 0,
					}}>
						{t('Mins')}
					</p>
				</div>

				<span style={{ 
					color: 'white', 
					fontSize: 'clamp(24px, 5vw, 36px)', 
					fontWeight: 'bold',
					paddingTop: '16px',
					flexShrink: 0,
					opacity: 0.7,
				}}>:</span>

				{/* Seconds */}
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
					<div
						style={{
							display: 'flex',
							height: 'clamp(60px, 12vw, 80px)',
							width: 'clamp(60px, 12vw, 80px)',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '16px',
							background: 'transparent',
							border: '2px solid rgba(255, 255, 255, 0.3)',
						}}
					>
						<p style={{ 
							color: 'white', 
							fontSize: 'clamp(20px, 4vw, 30px)', 
							fontWeight: 'bold', 
							letterSpacing: '-0.05em',
							margin: 0,
							lineHeight: '1',
						}}>
							{formatNumber(timeLeft.seconds)}
						</p>
					</div>
					<p style={{ 
						color: 'rgba(255, 255, 255, 0.7)', 
						fontSize: '12px', 
						fontWeight: 'bold', 
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						margin: 0,
					}}>
						{t('Secs')}
					</p>
				</div>
			</div>

			{/* Notify Me Button and Social Proof */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '16px',
					flexShrink: 0,
				}}
			>
				<button
					style={{
						display: 'flex',
						minWidth: '200px',
						cursor: 'pointer',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '9999px',
						height: '56px',
						padding: '0 32px',
						backgroundColor: 'white',
						color: '#121212',
						gap: '12px',
						fontSize: '18px',
						fontWeight: 'bold',
						border: 'none',
						transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
						whiteSpace: 'nowrap',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'scale(1.05)';
						e.currentTarget.style.backgroundColor = '#f0f0f0';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'scale(1)';
						e.currentTarget.style.backgroundColor = 'white';
					}}
					onClick={() => {
						// Open Google Calendar to add event
						window.open(getGoogleCalendarUrl(), '_blank');
					}}
				>
					<NotificationIcon />
					<span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{t('Notify Me')}</span>
				</button>
				<p
					style={{
						color: 'rgba(255, 255, 255, 0.7)',
						fontSize: '14px',
						fontWeight: '500',
						textAlign: 'center',
						margin: 0,
						padding: '0 clamp(10px, 3vw, 20px)',
					}}
				>
					{t('Join 15,402 others who pre-saved this')}
				</p>
			</div>
		</div>
	);
};


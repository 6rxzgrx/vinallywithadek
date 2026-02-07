import React, { useRef, useEffect, useState, useCallback } from 'react';

export enum Direction {
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical',
}

export const Slider = ({
	isEnabled,
	direction = Direction.HORIZONTAL,
	value,
	onChange,
	className = 'volume-sider',
	style,
	...props
}: {
	isEnabled: boolean;
	direction?: Direction;
	value: number; // 0-1
	onChange: (value: number) => void;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const handleRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);

	// Clamp value between 0 and 1
	const clampedValue = Math.max(0, Math.min(1, value));
	const percent = clampedValue * 100;

	// Update slider position based on clientX
	const updateSlider = useCallback(
		(clientX: number) => {
			if (!sliderRef.current || !isEnabled) return;

			const rect = sliderRef.current.getBoundingClientRect();
			let newPercent = (clientX - rect.left) / rect.width;
			newPercent = Math.max(0, Math.min(1, newPercent));

			onChange(newPercent);
		},
		[isEnabled, onChange]
	);

	// Handle mouse down
	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isEnabled) return;
			e.preventDefault();
			setIsDragging(true);
			updateSlider(e.clientX);
		},
		[isEnabled, updateSlider]
	);

	// Handle mouse move
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				updateSlider(e.clientX);
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, updateSlider]);

	// Handle touch events for mobile support
	const handleTouchStart = useCallback(
		(e: React.TouchEvent<HTMLDivElement>) => {
			if (!isEnabled) return;
			e.preventDefault();
			setIsDragging(true);
			const touch = e.touches[0];
			updateSlider(touch.clientX);
		},
		[isEnabled, updateSlider]
	);

	useEffect(() => {
		const handleTouchMove = (e: TouchEvent) => {
			if (isDragging && e.touches[0]) {
				updateSlider(e.touches[0].clientX);
			}
		};

		const handleTouchEnd = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener('touchmove', handleTouchMove);
			document.addEventListener('touchend', handleTouchEnd);
		}

		return () => {
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [isDragging, updateSlider]);

	return (
		<div className="volume-sider-container">
			<div
				ref={sliderRef}
				className={className}
				style={{
					position: 'relative',
					cursor: isEnabled ? 'pointer' : 'default',
					...style,
				}}
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
				{...props}
			>
				{/* Progress bar (position-sider) */}
				<div
					ref={progressRef}
					className="position-sider"
					style={{
						position: 'absolute',
						borderRadius: '4px',
						top: '0px',
						bottom: '0px',
						left: '0px',
						width: `${percent}%`,
					}}
				/>

				{/* Handle (handler-sider) */}
				<div
					ref={handleRef}
					className="handler-sider"
					style={{
						position: 'absolute',
						width: '10px',
						height: '10px',
						borderRadius: '100%',
						top: '0px',
						marginTop: '-3px',
						marginLeft: '-8px',
						left: `${percent}%`,
					}}
				/>

				{/* Hitbox overlay for better click handling */}
				<div
					style={{
						position: 'absolute',
						inset: '0px',
						zIndex: 10,
					}}
				/>
			</div>
		</div>
	);
};

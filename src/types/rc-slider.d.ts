declare module 'rc-slider' {
	import * as React from 'react';

	export interface SliderProps {
		value?: number | number[];
		defaultValue?: number | number[];
		min?: number;
		max?: number;
		step?: number | null;
		disabled?: boolean;
		vertical?: boolean;
		onChange?: (value: number | number[]) => void;
		onAfterChange?: (value: number | number[]) => void;
		className?: string;
		style?: React.CSSProperties;
		railStyle?: React.CSSProperties;
		trackStyle?: React.CSSProperties | React.CSSProperties[];
		handleStyle?: React.CSSProperties | React.CSSProperties[];
		dotStyle?: React.CSSProperties;
		activeDotStyle?: React.CSSProperties;
		[key: string]: any;
	}

	const Slider: React.FC<SliderProps>;
	export default Slider;
}

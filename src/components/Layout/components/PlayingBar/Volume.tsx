// Components
import { Space } from 'antd';
import { Tooltip } from '../../../Tooltip';
import { Slider } from '../../../Slider';
import {
	VolumeIcon,
	VolumeMuteIcon,
	VolumeOneIcon,
	VolumeTwoIcon,
} from '../../../Icons';

// Redux
import { playingBarActions } from '../../../../store/slices/playingBar';
import {
	useAppDispatch,
	useAppSelector,
	RootState,
} from '../../../../store/store';

// Constants
import { INITIAL_VOLUME } from '../../../../constants/player';

// I18n
import { useTranslation } from 'react-i18next';

const getIcon = (volume: number) => {
	if (volume === 0) {
		return <VolumeMuteIcon />;
	}

	if (volume < 0.4) {
		return <VolumeOneIcon />;
	}

	if (volume < 0.7) {
		return <VolumeTwoIcon />;
	}

	return <VolumeIcon />;
};

export const VolumeControls = () => {
	const { t } = useTranslation(['playingBar']);

	const dispatch = useAppDispatch();
	const { muted, volume } = useAppSelector(
		(state: RootState) => state.playingBar
	);

	return (
		<div className="volume-control-container">
			<Space style={{ display: 'flex' }}>
				<Tooltip title={muted ? t('Unmute') : t('Mute')}>
					<div
						onClick={() => {
							if (muted) {
								// Unmute: restore to previous volume or default to INITIAL_VOLUME if volume is 0
								dispatch(
									playingBarActions.setVolume({
										volume: volume > 0 ? volume : INITIAL_VOLUME,
									})
								);
							} else {
								// Mute: set volume to 0
								dispatch(playingBarActions.setVolume({ volume: 0 }));
							}
						}}
					>
						{getIcon(muted ? 0 : volume)}
					</div>
				</Tooltip>

				<div
					className="flex items-center justify-between w-full"
					style={{ width: 90 }}
				>
					<Slider
						isEnabled
						value={muted ? 0 : volume}
						onChange={(value) => {
							dispatch(playingBarActions.setVolume({ volume: value }));
						}}
					/>
				</div>
			</Space>
		</div>
	);
};

export default VolumeControls;

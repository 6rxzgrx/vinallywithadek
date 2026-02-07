import { Space } from 'antd';
import ForwardBackwardsButton from '../../../../pages/Home/ForwardBackwardsButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../../../Tooltip';

const HistoryNavigation = () => {
	const { t } = useTranslation(['navbar']);
	const navigate = useNavigate();

	return (
		<Space>
			<Tooltip placement="bottom" title={t('Home')}>
				<button
					onClick={() => {
						navigate('/');
					}}
					style={{
						background: 'none',
						border: 'none',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						padding: 0,
						transition: 'transform 0.2s ease-in-out',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'scale(1.1)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'scale(1)';
					}}
					onMouseDown={(e) => {
						e.currentTarget.style.transform = 'scale(1)';
					}}
					onMouseUp={(e) => {
						e.currentTarget.style.transform = 'scale(1.1)';
					}}
				>
					<img
						src="/images/invitation-logo.svg"
						alt="Invitation Logo"
						style={{ width: 35, height: 35, filter: 'brightness(0) invert(1)' }}
					/>
				</button>
			</Tooltip>

			<div className="flex flex-row items-center gap-2 h-full">
				<ForwardBackwardsButton flip />
				<ForwardBackwardsButton flip={false} />
			</div>
		</Space>
	);
};

export default HistoryNavigation;

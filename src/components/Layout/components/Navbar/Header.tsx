import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { getImagePublicPath } from '@/utils/getPublicPath';
const Header = ({ opacity }: { opacity: number; title?: string }) => {
	const { t } = useTranslation(['navbar']);

	return (
		<div
			className={`flex r-0 w-full flex-row items-center justify-between bg-gray-900 rounded-t-md z-10`}
			style={{ backgroundColor: `rgba(12, 12, 12, ${opacity}%)` }}
		>
			<div className="flex flex-row items-center">
				<Space>
					<Link to="/profile" className="contact-me">
						<span>{t('About Us')}</span>
					</Link>

					{/*
          <div className='news'>
            <News />
          </div> */}

					<div className="avatar-container">
						<Link to="/profile">
							<img
								className="avatar"
								id="user-avatar"
								alt="User Avatar"
								style={{ marginTop: -1 }}
								src={getImagePublicPath('profile.jpg')}
							/>
						</Link>
					</div>
				</Space>
			</div>
		</div>
	);
};

export default Header;

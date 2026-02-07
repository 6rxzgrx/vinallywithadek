import { Col, Dropdown, Row, Space, Modal, Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { ReloadOutlined } from '@ant-design/icons';

import { Tooltip } from '../../components/Tooltip';
import { MenuDots, OrderListIcon } from '../../components/Icons';

// Utils
import { useTranslation } from 'react-i18next';
import supabase from '../../utils/supabase';

// Redux
import { playlistActions } from '../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Interfaces
import type { FC } from 'react';
import type { Playlist } from '../../interfaces/types';
import { PlayCircleButton } from './playCircle';

// Constants
import { WeddingWish } from '../../constants/made-for/weddingwish';

export const PlaylistControls: FC<{ playlist: Playlist }> = ({ playlist }) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.playlist.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState<string>('');

  // Generate random seed for avatar
  const generateRandomSeed = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Initialize avatar seed when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setAvatarSeed(generateRandomSeed());
    }
  }, [isModalOpen]);

  // Check if this is the Wedding Wish playlist
  const isWeddingWishPlaylist = playlist.name === WeddingWish.name;


  const [tor] = useTranslation(['order']);
  const [t] = useTranslation(['playlist']);

  const filters = ['ALL', ...(playlist.filters || [])];

  const items = filters.map((filter) => ({
    key: filter,
    label: tor(filter),
    onClick: () => dispatch(playlistActions.setOrder({ order: filter })),
  }));

  const menuItems = isWeddingWishPlaylist
    ? [
        {
          key: 'add-wish',
          label: t('Add Wish'),
          onClick: () => setIsModalOpen(true),
        },
      ]
    : [];

  const handleSubmit = async (values: { name: string; wish: string }) => {
    setLoading(true);
    try {
      // Check if name already exists
      const { data: existingWish, error: checkError } = await supabase
        .from('wishes')
        .select('name')
        .eq('name', values.name)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is fine - name doesn't exist
        throw checkError;
      }

      if (existingWish) {
        // Name already exists
        form.setFields([
          {
            name: 'name',
            errors: [t('This name has already been used. Please use a different name.')],
          },
        ]);
        setLoading(false);
        return;
      }

      // Insert new wish
      const { error } = await supabase
        .from('wishes')
        .insert([
          { 
            name: values.name, 
            wish: values.wish,
            seed: avatarSeed
          },
        ])
        .select();

      if (error) {
        // Handle unique constraint error
        if (error.code === '23505' || error.message?.includes('unique') || error.message?.includes('duplicate')) {
          form.setFields([
            {
              name: 'name',
              errors: [t('This name has already been used. Please use a different name.')],
            },
          ]);
          setLoading(false);
          return;
        }
        throw error;
      }

      setIsModalOpen(false);
      form.resetFields();
      setAvatarSeed(''); // Reset avatar seed
      setIsSuccessModalOpen(true);
      
      // Auto close success modal after 3 seconds
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 3000);
      
      // Trigger refresh event for Wedding Wish playlist
      window.dispatchEvent(new Event('wishSubmitted'));
    } catch (error: any) {
      console.error('Error submitting wish:', error);
      message.error(error?.message || t('Failed to submit wish. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setAvatarSeed(''); // Reset avatar seed
  };

  const handleReloadAvatar = () => {
    setAvatarSeed(generateRandomSeed());
  };

  const getAvatarUrl = (seed: string): string => {
    return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundType=solid,gradientLinear&eyes=variant05,variant03&lips=variant30,variant03,variant11,variant14,variant15,variant17,variant16,variant22,variant23,variant25&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  };

  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space>
            <PlayCircleButton />
            {isWeddingWishPlaylist ? (
              <Dropdown
                placement='bottomLeft'
                menu={{ items: menuItems }}
                trigger={['click']}
              >
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <MenuDots />
                </button>
              </Dropdown>
            ) : (
              <MenuDots />
            )}
          </Space>
        </Col>
        <Col>
          <Space>
            <Tooltip title={t('Filter')}>
              <Dropdown
                placement='bottomRight'
                menu={{ items, selectedKeys: [order].filter((o) => o !== 'ALL') }}
              >
                <button className='order-button'>
                  <Space align='center'>
                    <span style={{ color: order !== 'ALL' ? 'inherit' : 'transparent' }}>
                      {tor(order)}
                    </span>
                    <OrderListIcon />
                  </Space>
                </button>
              </Dropdown>
            </Tooltip>
          </Space>
        </Col>
      </Row>

      {isWeddingWishPlaylist && (
        <Modal
          className='add-wish-modal'
          title={t('Add Wish')}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          width={500}
          getContainer={() => document.body}
        >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label={t('Choose Your Avatar')}
            style={{ marginBottom: 20 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              {avatarSeed && (
                <div style={{ 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  overflow: 'hidden',
                  border: '2px solid #878787',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#1a1a1a'
                }}>
                  <img 
                    src={getAvatarUrl(avatarSeed)} 
                    alt='Avatar preview'
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              <Button 
                icon={<ReloadOutlined />}
                onClick={handleReloadAvatar}
                className='reload-avatar-button'
              >
                {t('Reload Avatar')}
              </Button>
            </div>
          </Form.Item>
          <Form.Item
            name='name'
            label={t('Name')}
            rules={[{ required: true, message: t('Please enter your name') }]}
          >
            <Input placeholder={t('Enter your name')} />
          </Form.Item>
          <Form.Item
            name='wish'
            label={t('Wish')}
            rules={[{ required: true, message: t('Please enter your wish') }]}
          >
            <Input.TextArea
              rows={4}
              placeholder={t('Enter your wish')}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel} className='cancel-button' disabled={loading}>
                {t('Cancel')}
              </Button>
              <Button type='primary' htmlType='submit' className='submit-button' loading={loading}>
                {t('Submit')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      )}

      {/* Success Modal */}
      {isWeddingWishPlaylist && (
        <Modal
          className='wish-success-modal'
          open={isSuccessModalOpen}
          onCancel={() => setIsSuccessModalOpen(false)}
          footer={null}
          centered
          width={400}
          getContainer={() => document.body}
          closable={true}
        >
          <div className='wish-success-content'>
            <div className='wish-success-image'>
              <img 
                src='/images/wedding-wish/giphy.gif' 
                alt='Thank you'
                className='success-image'
              />
            </div>
            <h2 className='wish-success-title'>
              {t('Thank you for your wishes, good pray back to you')}
            </h2>
          </div>
        </Modal>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { PlayCircle } from './PlayCircle';

import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/store';
import { getCachedWishesCount, WISHES_CACHED_EVENT_NAME } from '../../constants/made-for/weddingwish';

import type { Playlist } from '../../interfaces/types';

const WEDDING_WISH_PLAYLIST_NAME = 'Wedding Wish';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: () => void;
  hideInfo?: boolean;
}

const PlaylistCard = ({ playlist, onClick, hideInfo = false }: PlaylistCardProps) => {
  const [t] = useTranslation(['cv']);
  const [tpy] = useTranslation(['playlist']);

  const isWeddingWish = playlist.name === WEDDING_WISH_PLAYLIST_NAME;
  const [weddingWishCount, setWeddingWishCount] = useState(() =>
    isWeddingWish ? getCachedWishesCount() || playlist.songs.length : 0
  );

  useEffect(() => {
    if (!isWeddingWish) return;
    const count = getCachedWishesCount();
    if (count > 0) setWeddingWishCount(count);
    const handler = () => setWeddingWishCount(getCachedWishesCount());
    window.addEventListener(WISHES_CACHED_EVENT_NAME, handler);
    return () => window.removeEventListener(WISHES_CACHED_EVENT_NAME, handler);
  }, [isWeddingWish]);

  const songCount = isWeddingWish && weddingWishCount > 0 ? weddingWishCount : playlist.songs.length;

  const title = t(playlist.name);
  const language = useAppSelector((state) => state.language.language);
  const description = `Playlist • ${songCount} ${tpy('songs')}`;

  return (
    <div
      style={{ cursor: 'pointer' }}
      className='playlist-card relative rounded-lg overflow-hidden  hover:bg-spotify-gray-lightest transition'
      onClick={onClick}
    >
      <div
        style={{ position: 'relative' }}
        className='aspect-square md:aspect-w-1 md:aspect-h-1/2 lg:aspect-w-1 lg:aspect-h-3/4 xl:aspect-w-1 xl:aspect-h-4/5 p-4'
      >
        <img src={playlist.getImage(language)} alt='' style={{ borderRadius: 5, width: '100%' }} />
        <div className='circle-play-div transition translate-y-1/4'>
          <PlayCircle />
        </div>
      </div>
      {!hideInfo && (
        <div className='playlist-card-info'>
          <h3 className='text-md font-semibold text-white'>{title}</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;

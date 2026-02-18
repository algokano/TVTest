import { useEffect } from 'react';

import { useAppDispatch } from '@store/index';
import { startPlayback } from '@store/slices/playbackSlice';

export const useAutoplayFeed = (videoId: string | null) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoId) {
      dispatch(startPlayback({ videoId }));
    }
  }, [dispatch, videoId]);
};

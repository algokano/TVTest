import { useEffect } from 'react';

import { useAppSelector } from '@store/index';

export const useRememberPosition = (
  videoId: string | null,
  seekTo: (positionSeconds: number) => void,
) => {
  const savedPosition = useAppSelector(state =>
    videoId ? state.playback.positionsByVideoId[videoId] : undefined,
  );

  useEffect(() => {
    if (videoId && savedPosition && savedPosition.positionSeconds > 0) {
      seekTo(savedPosition.positionSeconds);
    }
  }, [savedPosition, seekTo, videoId]);
};

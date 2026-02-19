import { useEffect, useRef } from 'react';

import { useAppSelector } from '@store/index';

export const useRememberPosition = (
  videoId: string | null,
  seekTo: (positionSeconds: number) => void,
) => {
  const hasRestoredRef = useRef<string | null>(null);

  const savedPosition = useAppSelector(state =>
    videoId ? state.playback.positionsByVideoId[videoId] : undefined,
  );

  useEffect(() => {
    if (
      videoId &&
      videoId !== hasRestoredRef.current &&
      savedPosition &&
      savedPosition.positionSeconds > 0
    ) {
      hasRestoredRef.current = videoId;
      seekTo(savedPosition.positionSeconds);
    }
  }, [videoId, savedPosition, seekTo]);
};

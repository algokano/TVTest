import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { useAppDispatch, useAppSelector } from '@store/index';
import { pausePlayback } from '@store/slices/playbackSlice';

export const useAppStatePlayback = () => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(state => state.playback.isPlaying);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const handleChange = (nextState: AppStateStatus) => {
      if (
        (nextState === 'background' || nextState === 'inactive') &&
        isPlayingRef.current
      ) {
        dispatch(pausePlayback());
      }
    };

    const sub = AppState.addEventListener('change', handleChange);
    return () => sub.remove();
  }, [dispatch]);
};

import { useCallback, useEffect, useRef, useState } from 'react';
import { TVEventControl } from 'react-native';

import { useTVFocusContext } from '@tv/focus/TVFocusProvider';

export type PlayerFocusElement = 'progressBar' | 'back' | 'nextEpisode';

interface UsePlayerControlsOptions {
  onTogglePlay: () => void;
  onBack: () => void;
  onNextEpisode: () => void;
  onSeekForward: () => void;
  onSeekBackward: () => void;
  onAnyKeyPress?: () => void;
}

export const usePlayerControls = (options: UsePlayerControlsOptions) => {
  const { setOverrideHandlers } = useTVFocusContext();
  const [focusedElement, setFocusedElement] =
    useState<PlayerFocusElement>('progressBar');
  const focusRef = useRef<PlayerFocusElement>('progressBar');
  focusRef.current = focusedElement;

  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    TVEventControl.enableTVMenuKey();
    return () => {
      TVEventControl.disableTVMenuKey();
    };
  }, []);

  const handleUp = useCallback(() => {
    optionsRef.current.onAnyKeyPress?.();
    if (focusRef.current === 'progressBar') {
      focusRef.current = 'back';
      setFocusedElement('back');
    }
  }, []);

  const handleDown = useCallback(() => {
    optionsRef.current.onAnyKeyPress?.();
    if (focusRef.current === 'back' || focusRef.current === 'nextEpisode') {
      focusRef.current = 'progressBar';
      setFocusedElement('progressBar');
    }
  }, []);

  const handleLeft = useCallback(() => {
    optionsRef.current.onAnyKeyPress?.();
    if (focusRef.current === 'progressBar') {
      optionsRef.current.onSeekBackward();
    } else if (focusRef.current === 'nextEpisode') {
      focusRef.current = 'back';
      setFocusedElement('back');
    }
  }, []);

  const handleRight = useCallback(() => {
    optionsRef.current.onAnyKeyPress?.();
    if (focusRef.current === 'progressBar') {
      optionsRef.current.onSeekForward();
    } else if (focusRef.current === 'back') {
      focusRef.current = 'nextEpisode';
      setFocusedElement('nextEpisode');
    }
  }, []);

  const handleSelect = useCallback(() => {
    optionsRef.current.onAnyKeyPress?.();
    switch (focusRef.current) {
      case 'progressBar':
        optionsRef.current.onTogglePlay();
        break;
      case 'back':
        optionsRef.current.onBack();
        break;
      case 'nextEpisode':
        optionsRef.current.onNextEpisode();
        break;
    }
  }, []);

  const handlePlayPause = useCallback(() => {
    optionsRef.current.onAnyKeyPress?.();
    optionsRef.current.onTogglePlay();
  }, []);

  const handleBack = useCallback(() => {
    optionsRef.current.onAnyKeyPress?.();
    optionsRef.current.onBack();
  }, []);

  useEffect(() => {
    setOverrideHandlers({
      onUp: handleUp,
      onDown: handleDown,
      onLeft: handleLeft,
      onRight: handleRight,
      onSelect: handleSelect,
      onPlayPause: handlePlayPause,
      onBack: handleBack,
    });

    return () => {
      setOverrideHandlers(null);
    };
  }, [
    setOverrideHandlers,
    handleUp,
    handleDown,
    handleLeft,
    handleRight,
    handleSelect,
    handlePlayPause,
    handleBack,
  ]);

  return { focusedElement };
};

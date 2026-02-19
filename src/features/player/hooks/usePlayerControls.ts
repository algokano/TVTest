import { useEffect } from 'react';
import { TVEventControl } from 'react-native';

import { useTVFocusContext } from '@tv/focus/TVFocusProvider';

interface UsePlayerControlsOptions {
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onBack: () => void;
}

export const usePlayerControls = (options: UsePlayerControlsOptions) => {
  const { setOverrideHandlers } = useTVFocusContext();

  useEffect(() => {
    TVEventControl.enableTVMenuKey();
    return () => {
      TVEventControl.disableTVMenuKey();
    };
  }, []);

  useEffect(() => {
    setOverrideHandlers({
      onUp: () => {
        if (options.canGoPrevious) {
          options.onPrevious();
        }
      },
      onDown: () => {
        if (options.canGoNext) {
          options.onNext();
        }
      },
      onSelect: options.onTogglePlay,
      onPlayPause: options.onTogglePlay,
      onBack: options.onBack,
    });

    return () => {
      setOverrideHandlers(null);
    };
  }, [options, setOverrideHandlers]);
};

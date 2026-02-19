import { useCallback, useEffect, useRef } from 'react';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';

const HIDE_DELAY_MS = 10_000;
const FADE_DURATION_MS = 300;

const TIMING_CONFIG = {
  duration: FADE_DURATION_MS,
  easing: Easing.out(Easing.cubic),
};

export const useControlsVisibility = (isPaused: boolean) => {
  const opacity = useSharedValue(1);
  const visibleRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const hide = useCallback(() => {
    visibleRef.current = false;
    opacity.value = withTiming(0, TIMING_CONFIG);
  }, [opacity]);

  const scheduleHide = useCallback(() => {
    clearHideTimer();
    timerRef.current = setTimeout(hide, HIDE_DELAY_MS);
  }, [clearHideTimer, hide]);

  const showControls = useCallback(() => {
    if (!visibleRef.current) {
      visibleRef.current = true;
      opacity.value = withTiming(1, TIMING_CONFIG);
    }
    scheduleHide();
  }, [opacity, scheduleHide]);

  useEffect(() => {
    if (isPaused) {
      clearHideTimer();
      visibleRef.current = true;
      opacity.value = withTiming(1, TIMING_CONFIG);
    } else {
      scheduleHide();
    }
  }, [isPaused, clearHideTimer, scheduleHide, opacity]);

  useEffect(() => {
    scheduleHide();
    return clearHideTimer;
  }, [scheduleHide, clearHideTimer]);

  return { opacity, showControls };
};

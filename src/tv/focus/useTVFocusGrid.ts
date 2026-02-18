import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { TVFocusGridConfig, TVKeyPressHandlers } from './types';
import { useTVFocusContext } from './TVFocusProvider';

export interface FocusableItemProps {
  hasTVPreferredFocus?: boolean;
  onFocus?: () => void;
}

export interface TVFocusGridApi {
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  getItemProps: (index: number) => FocusableItemProps;
  scrollIndex: number;
  isRowActive: boolean;
}

export const useTVFocusGrid = (config: TVFocusGridConfig): TVFocusGridApi => {
  const { itemCount, initialIndex = 0, rowIndex } = config;
  const [focusedIndex, setFocusedIndexInternal] = useState(initialIndex);
  const { activeRowIndex, registerRow } = useTVFocusContext();

  const isRowActive = activeRowIndex === rowIndex;

  const clampIndex = useCallback(
    (index: number) => {
      if (itemCount <= 0) {
        return 0;
      }
      if (index < 0) {
        return 0;
      }
      if (index >= itemCount) {
        return itemCount - 1;
      }
      return index;
    },
    [itemCount],
  );

  const setFocusedIndex = useCallback(
    (index: number) => {
      setFocusedIndexInternal(prev => {
        const next = clampIndex(index);
        return next === prev ? prev : next;
      });
    },
    [clampIndex],
  );

  const handlersRef = useRef<TVKeyPressHandlers>({});

  useEffect(() => {
    handlersRef.current = {
      onLeft: () => setFocusedIndex(focusedIndex - 1),
      onRight: () => setFocusedIndex(focusedIndex + 1),
    };
  }, [focusedIndex, setFocusedIndex]);

  useEffect(() => {
    const proxyHandlers: TVKeyPressHandlers = {
      onLeft: () => handlersRef.current.onLeft?.(),
      onRight: () => handlersRef.current.onRight?.(),
    };
    return registerRow(rowIndex, proxyHandlers);
  }, [registerRow, rowIndex]);

  const getItemProps = useCallback(
    (index: number): FocusableItemProps => ({
      hasTVPreferredFocus: isRowActive && focusedIndex === index,
    }),
    [focusedIndex, isRowActive],
  );

  return useMemo(
    () => ({
      focusedIndex,
      setFocusedIndex,
      getItemProps,
      scrollIndex: focusedIndex,
      isRowActive,
    }),
    [focusedIndex, getItemProps, isRowActive, setFocusedIndex],
  );
};

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import type { TVKeyPressHandlers } from './types';
import { useTVKeyPress } from './useTVKeyPress';

interface TVFocusContextValue {
  activeRowIndex: number;
  registerRow: (rowIndex: number, handlers: TVKeyPressHandlers) => () => void;
  setOverrideHandlers: (handlers: TVKeyPressHandlers | null) => void;
}

const TVFocusContext = createContext<TVFocusContextValue | undefined>(
  undefined,
);

export const useTVFocusContext = (): TVFocusContextValue => {
  const value = useContext(TVFocusContext);
  if (!value) {
    throw new Error('useTVFocusContext must be used within TVFocusProvider');
  }
  return value;
};

export const TVFocusProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const rowsRef = useRef<Map<number, TVKeyPressHandlers>>(new Map());
  const overrideRef = useRef<TVKeyPressHandlers | null>(null);
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const activeRowRef = useRef(0);
  activeRowRef.current = activeRowIndex;

  const setOverrideHandlers = useCallback(
    (handlers: TVKeyPressHandlers | null) => {
      overrideRef.current = handlers;
    },
    [],
  );

  const getSortedRowIndices = useCallback(
    () => Array.from(rowsRef.current.keys()).sort((a, b) => a - b),
    [],
  );

  const activateClosestRow = useCallback(() => {
    const indices = getSortedRowIndices();
    if (indices.length === 0) {
      return;
    }
    const current = activeRowRef.current;
    let closest = indices[0];
    for (const idx of indices) {
      if (Math.abs(idx - current) < Math.abs(closest - current)) {
        closest = idx;
      }
    }
    activeRowRef.current = closest;
    setActiveRowIndex(closest);
  }, [getSortedRowIndices]);

  const registerRow = useCallback(
    (rowIndex: number, handlers: TVKeyPressHandlers): (() => void) => {
      rowsRef.current.set(rowIndex, handlers);

      if (!rowsRef.current.has(activeRowRef.current)) {
        activateClosestRow();
      }

      return () => {
        rowsRef.current.delete(rowIndex);
        if (activeRowRef.current === rowIndex) {
          activateClosestRow();
        }
      };
    },
    [activateClosestRow],
  );

  useTVKeyPress({
    onUp: () => {
      if (overrideRef.current) {
        overrideRef.current.onUp?.();
        return;
      }
      const indices = getSortedRowIndices();
      const currentPos = indices.indexOf(activeRowRef.current);
      if (currentPos > 0) {
        const next = indices[currentPos - 1];
        activeRowRef.current = next;
        setActiveRowIndex(next);
      }
    },
    onDown: () => {
      if (overrideRef.current) {
        overrideRef.current.onDown?.();
        return;
      }
      const indices = getSortedRowIndices();
      const currentPos = indices.indexOf(activeRowRef.current);
      if (currentPos >= 0 && currentPos < indices.length - 1) {
        const next = indices[currentPos + 1];
        activeRowRef.current = next;
        setActiveRowIndex(next);
      }
    },
    onLeft: () => {
      const h =
        overrideRef.current ?? rowsRef.current.get(activeRowRef.current);
      h?.onLeft?.();
    },
    onRight: () => {
      const h =
        overrideRef.current ?? rowsRef.current.get(activeRowRef.current);
      h?.onRight?.();
    },
    onSelect: () => {
      const h =
        overrideRef.current ?? rowsRef.current.get(activeRowRef.current);
      h?.onSelect?.();
    },
    onBack: () => {
      const h =
        overrideRef.current ?? rowsRef.current.get(activeRowRef.current);
      h?.onBack?.();
    },
    onPlayPause: () => {
      const h =
        overrideRef.current ?? rowsRef.current.get(activeRowRef.current);
      h?.onPlayPause?.();
    },
  });

  return (
    <TVFocusContext.Provider
      value={{ activeRowIndex, registerRow, setOverrideHandlers }}
    >
      {children}
    </TVFocusContext.Provider>
  );
};

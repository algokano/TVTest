import { useTVFocusGrid } from '@tv/focus/useTVFocusGrid';

export const useHomeFocusGrid = (itemCount: number, rowIndex: number) => {
  return useTVFocusGrid({
    itemCount,
    initialIndex: 0,
    mode: 'fixed-left',
    rowIndex,
  });
};

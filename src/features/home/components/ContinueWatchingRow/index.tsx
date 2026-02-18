import React from 'react';

import type { NormalizedItem } from '@store/slices/catalogSlice';
import { SectionRow } from '../SectionRow';

interface ContinueWatchingRowProps {
  items: NormalizedItem[];
  onItemPress?: (item: NormalizedItem) => void;
  onItemFocusChange?: (item: NormalizedItem, sectionTitle: string) => void;
  rowIndex: number;
}

export const ContinueWatchingRow: React.FC<ContinueWatchingRowProps> = ({
  items,
  onItemPress,
  onItemFocusChange,
  rowIndex,
}) => {
  if (!items.length) {
    return null;
  }

  return (
    <SectionRow
      section={{
        id: 'continue-watching',
        title: 'Continue Watching',
        order: -1,
        type: 'continue_watching',
        bannerIds: [],
        itemIds: items.map(i => i.id),
      }}
      items={items}
      onItemPress={onItemPress}
      onItemFocusChange={
        onItemFocusChange
          ? item => onItemFocusChange(item, 'Continue Watching')
          : undefined
      }
      rowIndex={rowIndex}
    />
  );
};

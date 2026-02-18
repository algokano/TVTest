import React from 'react';

import type { NormalizedItem } from '@store/slices/catalogSlice';
import { SectionRow } from '../SectionRow';

interface ComingSoonRowProps {
  items: NormalizedItem[];
  onItemPress?: (item: NormalizedItem) => void;
  onItemFocusChange?: (item: NormalizedItem, sectionTitle: string) => void;
  rowIndex: number;
}

export const ComingSoonRow: React.FC<ComingSoonRowProps> = ({
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
        id: 'coming-soon',
        title: 'Coming Soon',
        order: 999,
        type: 'coming_soon',
        bannerIds: [],
        itemIds: items.map(i => i.id),
      }}
      items={items}
      onItemPress={onItemPress}
      onItemFocusChange={onItemFocusChange}
      rowIndex={rowIndex}
    />
  );
};

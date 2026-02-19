import React, { useEffect, useMemo, useRef } from 'react';
import { Dimensions, FlatList, Text, View, ViewStyle } from 'react-native';

import type {
  NormalizedItem,
  NormalizedSection,
} from '@store/slices/catalogSlice';
import { useHomeFocusGrid } from '../../hooks/useHomeFocusGrid';
import { ItemCard } from '../ItemCard';
import { CARD_WIDTH } from '../ItemCard/styles';
import { spacing } from '@shared/theme';
import styles from './styles';

interface SectionRowProps {
  section: NormalizedSection;
  items: NormalizedItem[];
  onItemPress?: (item: NormalizedItem) => void;
  onItemFocusChange?: (item: NormalizedItem, sectionTitle: string) => void;
  rowIndex: number;
}

const ITEM_STRIDE = CARD_WIDTH + spacing.md;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const SectionRow: React.FC<SectionRowProps> = ({
  section,
  items,
  onItemPress,
  onItemFocusChange,
  rowIndex,
}) => {
  const listRef = useRef<FlatList<NormalizedItem> | null>(null);
  const focusGrid = useHomeFocusGrid(items.length, rowIndex);

  const listContentStyle = useMemo(
    () => ({
      gap: spacing.md,
      alignItems: 'center',
      paddingLeft: spacing.lg,
      paddingRight: Math.max(
        spacing.lg,
        SCREEN_WIDTH - CARD_WIDTH - spacing.lg,
      ),
    }),
    [],
  );

  useEffect(() => {
    if (!items.length || !focusGrid.isRowActive) {
      return;
    }

    const index = focusGrid.scrollIndex;
    if (index < 0 || index >= items.length) {
      return;
    }

    try {
      const offset = ITEM_STRIDE * index;
      listRef.current?.scrollToOffset({ offset, animated: false });
    } catch {
      // FlatList will recover on next layout pass.
    }
  }, [focusGrid.scrollIndex, focusGrid.isRowActive, items.length]);

  useEffect(() => {
    if (!focusGrid.isRowActive || !items.length || !onItemFocusChange) {
      return;
    }

    const index = focusGrid.focusedIndex;
    const item = items[index];
    if (item) {
      onItemFocusChange(item, section.title);
    }
  }, [
    focusGrid.isRowActive,
    focusGrid.focusedIndex,
    items,
    onItemFocusChange,
    section.title,
  ]);

  if (!items.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{section.title}</Text>
      <View style={styles.rowContainer}>
        <FlatList
          ref={listRef}
          horizontal
          data={items}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={listContentStyle as ViewStyle}
          extraData={focusGrid.isRowActive ? focusGrid.focusedIndex : -1}
          getItemLayout={(_, index) => ({
            length: ITEM_STRIDE,
            offset: spacing.lg + ITEM_STRIDE * index,
            index,
          })}
          renderItem={({ item, index }) => {
            const focusProps = focusGrid.getItemProps(index);

            return (
              <ItemCard
                data={item}
                focusProps={focusProps}
                onPress={() => onItemPress?.(item)}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

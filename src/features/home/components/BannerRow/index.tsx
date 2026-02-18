import React, { useEffect, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

import type { HomeBannerConfig } from '../../types';
import { useHomeFocusGrid } from '../../hooks/useHomeFocusGrid';
import { TVFocusable } from '@tv/components/TVFocusable';
import { spacing } from '@shared/theme';
import styles from './styles';

interface BannerRowProps {
  title: string;
  banners: HomeBannerConfig[];
  onBannerPress?: (banner: HomeBannerConfig) => void;
  onBannerFocusChange?: (
    banner: HomeBannerConfig,
    sectionTitle: string,
  ) => void;
  rowIndex: number;
}

export const BannerRow: React.FC<BannerRowProps> = ({
  title,
  banners,
  onBannerPress,
  onBannerFocusChange,
  rowIndex,
}) => {
  const listRef = useRef<FlatList<HomeBannerConfig> | null>(null);
  const focusGrid = useHomeFocusGrid(banners.length, rowIndex);

  useEffect(() => {
    if (!banners.length) {
      return;
    }

    const index = focusGrid.scrollIndex;
    if (index < 0 || index >= banners.length) {
      return;
    }

    try {
      listRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0,
      });
    } catch {
      // Ignore occasional measurement errors; FlatList will recover.
    }
  }, [banners.length, focusGrid.scrollIndex]);

  useEffect(() => {
    if (!focusGrid.isRowActive || !banners.length || !onBannerFocusChange) {
      return;
    }

    const index = focusGrid.focusedIndex;
    const banner = banners[index];
    if (banner) {
      onBannerFocusChange(banner, title);
    }
  }, [
    focusGrid.isRowActive,
    banners,
    focusGrid.focusedIndex,
    onBannerFocusChange,
    title,
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        ref={listRef}
        horizontal
        data={banners}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        extraData={focusGrid.isRowActive ? focusGrid.focusedIndex : -1}
        getItemLayout={(_, index) => {
          const ITEM_WIDTH = BANNER_WIDTH + SPACING_MD;
          const offset = SPACING_LG + ITEM_WIDTH * index;
          return {
            length: ITEM_WIDTH,
            offset,
            index,
          };
        }}
        renderItem={({ item, index }) => {
          const focusProps = focusGrid.getItemProps(index);

          return (
            <TVFocusable
              focusProps={focusProps}
              onPress={() => onBannerPress?.(item)}
              style={styles.banner}
              focusedStyle={styles.bannerFocused}
            >
              <View style={styles.bannerInner}>
                <Text style={styles.bannerTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </TVFocusable>
          );
        }}
      />
    </View>
  );
};

const BANNER_WIDTH = 520;
const SPACING_MD = spacing.md;
const SPACING_LG = spacing.lg;

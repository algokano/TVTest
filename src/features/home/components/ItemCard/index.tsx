import React from 'react';
import { Image, Text, View } from 'react-native';

import type { HomeItemConfig } from '../../types';
import type { FocusableItemProps } from '@tv/focus/useTVFocusGrid';
import { TVFocusable } from '@tv/components/TVFocusable';
import styles from './styles';

interface ItemCardProps {
  item: HomeItemConfig;
  focusProps?: FocusableItemProps;
  onPress?: () => void;
  /** When false the card never renders its own focus border/scale. */
  showFocusBorder?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  focusProps,
  onPress,
  showFocusBorder = true,
}) => {
  const imageUri = item.posterUrl || item.thumbnailUrl;

  return (
    <TVFocusable
      focusProps={focusProps}
      onPress={onPress}
      style={styles.card}
      focusedStyle={showFocusBorder ? styles.cardFocused : undefined}
    >
      <View style={styles.posterContainer}>
        <Image source={{ uri: imageUri }} style={styles.poster} />
        {item.badge && (
          <View
            style={[
              styles.badgeContainer,
              item.badge === 'top' ? styles.badgeTop : styles.badgeNew,
            ]}
          >
            <Text style={styles.badgeText}>
              {item.badge === 'top' ? 'TOP' : 'NEW'}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TVFocusable>
  );
};

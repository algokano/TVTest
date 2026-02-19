import React from 'react';
import { Image, Text, View } from 'react-native';

import type { HomeItemConfig } from '../../types';
import type { FocusableItemProps } from '@tv/focus/useTVFocusGrid';
import { TVFocusable } from '@tv/components/TVFocusable';
import styles from './styles';

interface ItemCardProps {
  data: HomeItemConfig;
  focusProps?: FocusableItemProps;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  data,
  focusProps,
  onPress,
}) => {
  const imageUri = data.posterUrl || data.thumbnailUrl;

  return (
    <TVFocusable
      focusProps={focusProps}
      onPress={onPress}
      style={styles.card}
      focusedStyle={styles.cardFocused}
    >
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.poster}
          resizeMode={'cover'}
        />

        {data.badge && (
          <View
            style={[
              styles.badgeContainer,
              data.badge === 'top' ? styles.badgeTop : styles.badgeNew,
            ]}
          >
            <Text style={styles.badgeText}>
              {data.badge === 'top' ? 'TOP' : 'NEW'}
            </Text>
          </View>
        )}
      </View>
      {/* <Text style={styles.title} numberOfLines={1}>
        {data.title}
      </Text> */}
    </TVFocusable>
  );
};

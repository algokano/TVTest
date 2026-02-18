import React from 'react';
import { Pressable, StyleProp, ViewStyle, View } from 'react-native';

import type { FocusableItemProps } from '@tv/focus/useTVFocusGrid';

interface TVFocusableProps {
  focusProps?: FocusableItemProps;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  focusedStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const TVFocusable: React.FC<TVFocusableProps> = ({
  focusProps,
  onPress,
  style,
  focusedStyle,
  children,
}) => {
  const isFocused = focusProps?.hasTVPreferredFocus ?? false;

  const combinedStyle: StyleProp<ViewStyle> = [
    style,
    isFocused && focusedStyle,
  ];

  return (
    <Pressable {...focusProps} onPress={onPress} style={combinedStyle}>
      <View>{children}</View>
    </Pressable>
  );
};

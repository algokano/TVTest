import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

interface TVTouchableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const TVTouchable: React.FC<TVTouchableProps> = ({
  onPress,
  style,
  children,
}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      {children}
    </Pressable>
  );
};

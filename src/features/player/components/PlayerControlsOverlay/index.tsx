import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

interface PlayerControlsOverlayProps {
  title: string;
  isPlaying: boolean;
}

export const PlayerControlsOverlay: React.FC<PlayerControlsOverlayProps> = ({
  title,
  isPlaying,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.helper}>
        {isPlaying
          ? 'Press OK / Play-Pause to Pause'
          : 'Press OK / Play-Pause to Play'}
      </Text>
      <Text style={styles.helper}>Use Up / Down to switch videos</Text>
    </View>
  );
};

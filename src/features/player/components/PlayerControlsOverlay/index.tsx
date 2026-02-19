import React from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { BackArrowIcon, NextEpisodeIcon } from '@shared/icons';
import type { PlayerFocusElement } from '../../hooks/usePlayerControls';
import { ProgressBar } from '../ProgressBar';
import styles from './styles';

interface PlayerControlsOverlayProps {
  episodeNumber: number;
  showTitle: string;
  totalEpisodes: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  opacity: SharedValue<number>;
  focusedElement: PlayerFocusElement;
}

export const PlayerControlsOverlay: React.FC<PlayerControlsOverlayProps> = ({
  episodeNumber,
  showTitle,
  totalEpisodes,
  isPlaying,
  currentTime,
  duration,
  opacity,
  focusedElement,
}) => {
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.topBar}>
        <View
          style={[
            styles.topBarButton,
            focusedElement === 'back' && styles.topBarButtonFocused,
          ]}
        >
          <BackArrowIcon size={32} />
        </View>
        <View
          style={[
            styles.topBarButton,
            focusedElement === 'nextEpisode' && styles.topBarButtonFocused,
          ]}
        >
          <NextEpisodeIcon size={32} />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.episodeInfo}>
          <Text style={styles.episodeTitle}>Episode {episodeNumber}</Text>
          <Text style={styles.showInfo}>
            {showTitle} ({totalEpisodes} episodes)
          </Text>
        </View>

        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          isFocused={focusedElement === 'progressBar'}
        />
      </View>
    </Animated.View>
  );
};

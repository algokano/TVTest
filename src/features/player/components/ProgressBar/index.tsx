import React from 'react';
import { Text, View } from 'react-native';

import { PlayIcon, PauseIcon } from '@shared/icons';
import styles from './styles';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isFocused?: boolean;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  isPlaying,
  isFocused,
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.playPauseButton,
          isFocused && styles.playPauseButtonFocused,
        ]}
      >
        {isPlaying ? (
          <PauseIcon size={28} color="#FFFFFF" />
        ) : (
          <PlayIcon size={28} color="#FFFFFF" />
        )}
      </View>

      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>

      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${progress}%` }]} />
          <View style={[styles.barThumb, { left: `${progress}%` }]} />
        </View>
      </View>

      <Text style={styles.timeText}>{formatTime(duration)}</Text>
    </View>
  );
};

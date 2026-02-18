import React, { useRef } from 'react';
import { View } from 'react-native';
import Video, { OnLoadData, OnProgressData } from 'react-native-video';

import type { VideoMeta } from '../../types';
import { useAppDispatch } from '@store/index';
import { updatePlaybackPosition } from '@store/slices/playbackSlice';
import { useRememberPosition } from '../../hooks/useRememberPosition';
import styles from './styles';

interface VideoItemProps {
  video: VideoMeta;
  isPlaying: boolean;
}

export const VideoItem: React.FC<VideoItemProps> = ({ video, isPlaying }) => {
  const dispatch = useAppDispatch();
  const playerRef = useRef<React.ElementRef<typeof Video> | null>(null);

  const handleProgress = (data: OnProgressData) => {
    dispatch(
      updatePlaybackPosition({
        videoId: video.id,
        positionSeconds: data.currentTime,
        durationSeconds: data.seekableDuration,
      }),
    );
  };

  const seekTo = (positionSeconds: number) => {
    if (playerRef.current && Number.isFinite(positionSeconds)) {
      playerRef.current.seek(positionSeconds);
    }
  };

  useRememberPosition(video.id, seekTo);

  const handleLoad = (data: OnLoadData) => {
    dispatch(
      updatePlaybackPosition({
        videoId: video.id,
        positionSeconds: 0,
        durationSeconds: data.duration,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Video
        ref={ref => {
          playerRef.current = ref;
        }}
        source={{ uri: video.url }}
        style={styles.video}
        resizeMode="cover"
        paused={!isPlaying}
        onProgress={handleProgress}
        onLoad={handleLoad}
      />
    </View>
  );
};

import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';
import { View } from 'react-native';
import Video, { OnLoadData, OnProgressData } from 'react-native-video';

import type { VideoMeta } from '../../types';
import { useAppDispatch } from '@store/index';
import { updatePlaybackPosition } from '@store/slices/playbackSlice';
import { useRememberPosition } from '../../hooks/useRememberPosition';
import styles from './styles';

export interface VideoItemHandle {
  seekTo: (positionSeconds: number) => void;
}

interface VideoItemProps {
  video: VideoMeta;
  isPlaying: boolean;
  onProgressUpdate?: (currentTime: number, duration: number) => void;
}

export const VideoItem = forwardRef<VideoItemHandle, VideoItemProps>(
  ({ video, isPlaying, onProgressUpdate }, ref) => {
    const dispatch = useAppDispatch();
    const playerRef = useRef<React.ElementRef<typeof Video> | null>(null);

    const seekTo = useCallback((positionSeconds: number) => {
      if (playerRef.current && Number.isFinite(positionSeconds)) {
        playerRef.current.seek(positionSeconds);
      }
    }, []);

    useImperativeHandle(ref, () => ({ seekTo }), [seekTo]);

    const handleProgress = useCallback(
      (data: OnProgressData) => {
        dispatch(
          updatePlaybackPosition({
            videoId: video.id,
            positionSeconds: data.currentTime,
            durationSeconds: data.seekableDuration,
          }),
        );
        onProgressUpdate?.(data.currentTime, data.seekableDuration);
      },
      [video.id, dispatch, onProgressUpdate],
    );

    useRememberPosition(video.id, seekTo);

    const handleLoad = useCallback(
      (data: OnLoadData) => {
        dispatch(
          updatePlaybackPosition({
            videoId: video.id,
            positionSeconds: 0,
            durationSeconds: data.duration,
          }),
        );
        onProgressUpdate?.(0, data.duration);
      },
      [video.id, dispatch, onProgressUpdate],
    );

    return (
      <View style={styles.container}>
        <Video
          ref={r => {
            playerRef.current = r;
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
  },
);

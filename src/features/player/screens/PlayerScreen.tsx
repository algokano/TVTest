import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import {
  SCREENS,
  type RootStackParamList,
} from '@app/navigation/RootNavigator';
import { orderedVideos, videoById } from '@shared/constants/videos';
import { useAppSelector, useAppDispatch } from '@store/index';
import { pausePlayback, startPlayback } from '@store/slices/playbackSlice';
import { useAutoplayFeed } from '../hooks/useAutoplayFeed';
import { usePlayerControls } from '../hooks/usePlayerControls';
import { useControlsVisibility } from '../hooks/useControlsVisibility';
import { useAppStatePlayback } from '../hooks/useAppStatePlayback';
import { VideoItem, VideoItemHandle } from '../components/VideoItem';
import { PlayerControlsOverlay } from '../components/PlayerControlsOverlay';
import styles from './PlayerScreen.styles';

const SEEK_STEP_SECONDS = 10;

type PlayerRouteProp = RouteProp<RootStackParamList, typeof SCREENS.Player>;

export const PlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PlayerRouteProp>();
  const dispatch = useAppDispatch();
  const videoRef = useRef<VideoItemHandle>(null);

  const [index, setIndex] = useState(() => {
    if (
      route.params?.initialVideoId &&
      videoById[route.params.initialVideoId]
    ) {
      return (
        orderedVideos.findIndex(v => v.id === route.params!.initialVideoId) || 0
      );
    }
    return 0;
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);

  const playback = useAppSelector(state => state.playback);

  const currentVideo = useMemo(() => {
    return orderedVideos[index] ?? orderedVideos[0];
  }, [index]);

  const isPlaying =
    playback.isPlaying && playback.currentVideoId === currentVideo.id;

  useAutoplayFeed(currentVideo.id);
  useAppStatePlayback();

  const { opacity, showControls } = useControlsVisibility(!isPlaying);

  const handleProgressUpdate = useCallback((time: number, dur: number) => {
    setCurrentTime(time);
    currentTimeRef.current = time;
    if (dur > 0) {
      setDuration(dur);
      durationRef.current = dur;
    }
  }, []);

  const handleNextEpisode = useCallback(() => {
    const nextIdx = Math.min(index + 1, orderedVideos.length - 1);
    if (nextIdx !== index) {
      setIndex(nextIdx);
      setCurrentTime(0);
      setDuration(0);
      currentTimeRef.current = 0;
      durationRef.current = 0;
      dispatch(startPlayback({ videoId: orderedVideos[nextIdx].id }));
    }
  }, [index, dispatch]);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      dispatch(pausePlayback());
    } else {
      dispatch(startPlayback({ videoId: currentVideo.id }));
    }
  }, [isPlaying, currentVideo.id, dispatch]);

  const handleSeekForward = useCallback(() => {
    const newTime = Math.min(
      currentTimeRef.current + SEEK_STEP_SECONDS,
      durationRef.current,
    );
    videoRef.current?.seekTo(newTime);
    setCurrentTime(newTime);
    currentTimeRef.current = newTime;
  }, []);

  const handleSeekBackward = useCallback(() => {
    const newTime = Math.max(currentTimeRef.current - SEEK_STEP_SECONDS, 0);
    videoRef.current?.seekTo(newTime);
    setCurrentTime(newTime);
    currentTimeRef.current = newTime;
  }, []);

  const handleBack = useCallback(() => {
    dispatch(pausePlayback());
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [dispatch, navigation]);

  const { focusedElement } = usePlayerControls({
    onTogglePlay: handleTogglePlay,
    onBack: handleBack,
    onNextEpisode: handleNextEpisode,
    onSeekForward: handleSeekForward,
    onSeekBackward: handleSeekBackward,
    onAnyKeyPress: showControls,
  });

  return (
    <View style={styles.container}>
      <VideoItem
        ref={videoRef}
        video={currentVideo}
        isPlaying={isPlaying}
        onProgressUpdate={handleProgressUpdate}
      />
      <PlayerControlsOverlay
        episodeNumber={currentVideo.episodeNumber}
        showTitle={currentVideo.showTitle}
        totalEpisodes={currentVideo.totalEpisodes}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        opacity={opacity}
        focusedElement={focusedElement}
      />
    </View>
  );
};

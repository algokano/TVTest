import React, { useMemo, useState } from 'react';
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
import { VideoItem } from '../components/VideoItem';
import { PlayerControlsOverlay } from '../components/PlayerControlsOverlay';
import styles from './PlayerScreen.styles';

type PlayerRouteProp = RouteProp<RootStackParamList, typeof SCREENS.Player>;

export const PlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PlayerRouteProp>();
  const dispatch = useAppDispatch();

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

  const playback = useAppSelector(state => state.playback);

  const currentVideo = useMemo(() => {
    return orderedVideos[index] ?? orderedVideos[0];
  }, [index]);

  const isPlaying =
    playback.isPlaying && playback.currentVideoId === currentVideo.id;

  useAutoplayFeed(currentVideo.id);

  const handleNext = () => {
    setIndex(prev => {
      const next = Math.min(prev + 1, orderedVideos.length - 1);
      const video = orderedVideos[next];
      dispatch(startPlayback({ videoId: video.id }));
      return next;
    });
  };

  const handlePrevious = () => {
    setIndex(prev => {
      const next = Math.max(prev - 1, 0);
      const video = orderedVideos[next];
      dispatch(startPlayback({ videoId: video.id }));
      return next;
    });
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      dispatch(pausePlayback());
    } else {
      dispatch(startPlayback({ videoId: currentVideo.id }));
    }
  };

  usePlayerControls({
    canGoPrevious: index > 0,
    canGoNext: index < orderedVideos.length - 1,
    onPrevious: handlePrevious,
    onNext: handleNext,
    onTogglePlay: handleTogglePlay,
    onBack: () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    },
  });

  return (
    <View style={styles.container}>
      <VideoItem video={currentVideo} isPlaying={isPlaying} />
      <PlayerControlsOverlay title={currentVideo.title} isPlaying={isPlaying} />
    </View>
  );
};

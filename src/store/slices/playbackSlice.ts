import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlaybackPosition {
  videoId: string;
  positionSeconds: number;
  durationSeconds?: number;
  updatedAt: number;
}

export interface PlaybackState {
  currentVideoId: string | null;
  isPlaying: boolean;
  positionsByVideoId: Record<string, PlaybackPosition>;
}

const initialState: PlaybackState = {
  currentVideoId: null,
  isPlaying: false,
  positionsByVideoId: {},
};

const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    startPlayback(state, action: PayloadAction<{ videoId: string }>) {
      state.currentVideoId = action.payload.videoId;
      state.isPlaying = true;
    },
    pausePlayback(state) {
      state.isPlaying = false;
    },
    stopPlayback(state) {
      state.currentVideoId = null;
      state.isPlaying = false;
    },
    updatePlaybackPosition(
      state,
      action: PayloadAction<{
        videoId: string;
        positionSeconds: number;
        durationSeconds?: number;
      }>,
    ) {
      const { videoId, positionSeconds, durationSeconds } = action.payload;
      state.positionsByVideoId[videoId] = {
        videoId,
        positionSeconds,
        durationSeconds,
        updatedAt: Date.now(),
      };
    },
    clearPlaybackHistory(state) {
      state.positionsByVideoId = {};
    },
  },
});

export const {
  startPlayback,
  pausePlayback,
  stopPlayback,
  updatePlaybackPosition,
  clearPlaybackHistory,
} = playbackSlice.actions;

export const playbackReducer = playbackSlice.reducer;

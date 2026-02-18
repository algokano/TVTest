import { combineReducers } from '@reduxjs/toolkit';

import { configReducer } from './slices/configSlice';
import { catalogReducer } from './slices/catalogSlice';
import { playbackReducer } from './slices/playbackSlice';
import { uiReducer } from './slices/uiSlice';
import { remoteConfigApi } from './services/remoteConfigApi';

export const rootReducer = combineReducers({
  config: configReducer,
  catalog: catalogReducer,
  playback: playbackReducer,
  ui: uiReducer,
  [remoteConfigApi.reducerPath]: remoteConfigApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

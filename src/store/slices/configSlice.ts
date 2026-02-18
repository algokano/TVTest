import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { HomeScreenConfig } from '@shared/types/config';

export type ConfigStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ConfigState {
  homeConfig: HomeScreenConfig | null;
  status: ConfigStatus;
  lastUpdated: number | null;
  error?: string;
}

const initialState: ConfigState = {
  homeConfig: null,
  status: 'idle',
  lastUpdated: null,
  error: undefined,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setHomeConfig(state, action: PayloadAction<HomeScreenConfig>) {
      state.homeConfig = action.payload;
      state.status = 'succeeded';
      state.lastUpdated = Date.now();
      state.error = undefined;
    },
    setLoading(state) {
      state.status = 'loading';
      state.error = undefined;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setHomeConfig, setLoading, setError } = configSlice.actions;
export const configReducer = configSlice.reducer;

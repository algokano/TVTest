import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  isGlobalLoading: boolean;
  globalError?: string;
}

const initialState: UiState = {
  isGlobalLoading: false,
  globalError: undefined,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.isGlobalLoading = action.payload;
    },
    setGlobalError(state, action: PayloadAction<string | undefined>) {
      state.globalError = action.payload;
    },
  },
});

export const { setGlobalLoading, setGlobalError } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

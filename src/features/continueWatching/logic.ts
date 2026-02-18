import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@store/rootReducer';

const MIN_POSITION_SECONDS = 5;

export const selectContinueWatchingItems = createSelector(
  (state: RootState) => state.catalog,
  (state: RootState) => state.playback.positionsByVideoId,
  (catalog, positionsByVideoId) => {
    const items = Object.values(catalog.items);

    return items.filter(item => {
      const position = positionsByVideoId[item.videoId];
      return position && position.positionSeconds >= MIN_POSITION_SECONDS;
    });
  },
);

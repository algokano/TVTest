import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../rootReducer';
import type {
  HomeBannerConfig,
  HomeItemConfig,
  HomeScreenConfig,
  HomeSectionConfig,
} from '@shared/types/config';

export interface NormalizedBanner extends HomeBannerConfig {}

export interface NormalizedItem extends HomeItemConfig {}

export interface NormalizedSection
  extends Omit<HomeSectionConfig, 'banners' | 'items'> {
  bannerIds: string[];
  itemIds: string[];
}

export interface CatalogState {
  sections: Record<string, NormalizedSection>;
  banners: Record<string, NormalizedBanner>;
  items: Record<string, NormalizedItem>;
  orderedSectionIds: string[];
}

const initialState: CatalogState = {
  sections: {},
  banners: {},
  items: {},
  orderedSectionIds: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setHomeCatalogFromConfig(state, action: PayloadAction<HomeScreenConfig>) {
      const config = action.payload;

      const sections: Record<string, NormalizedSection> = {};
      const banners: Record<string, NormalizedBanner> = {};
      const items: Record<string, NormalizedItem> = {};

      const orderedSectionIds = [...config.sections]
        .sort((a, b) => a.order - b.order)
        .map(section => section.id);

      config.sections.forEach(section => {
        const bannerIds: string[] = [];
        const itemIds: string[] = [];

        section.banners?.forEach(banner => {
          banners[banner.id] = banner;
          bannerIds.push(banner.id);
        });

        section.items?.forEach(item => {
          items[item.id] = item;
          itemIds.push(item.id);
        });

        sections[section.id] = {
          id: section.id,
          order: section.order,
          type: section.type,
          title: section.title,
          bannerIds,
          itemIds,
        };
      });

      state.sections = sections;
      state.banners = banners;
      state.items = items;
      state.orderedSectionIds = orderedSectionIds;
    },
    resetCatalog(state) {
      state.sections = {};
      state.banners = {};
      state.items = {};
      state.orderedSectionIds = [];
    },
  },
});

export const { setHomeCatalogFromConfig, resetCatalog } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;

const selectCatalogState = (state: RootState) => state.catalog;

export const selectOrderedSections = createSelector(
  selectCatalogState,
  catalog =>
    catalog.orderedSectionIds
      .map(sectionId => catalog.sections[sectionId])
      .filter(Boolean),
);

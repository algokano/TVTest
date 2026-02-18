export type HomeSectionType =
  | 'continue_watching'
  | 'banner'
  | 'regular'
  | 'coming_soon';

export type ItemBadge = 'top' | 'new';

export interface HomeBannerConfig {
  id: string;
  title: string;
  thumbnailUrl: string;
  targetSeriesId: string;
}

export interface HomeItemConfig {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoId: string;
  isComingSoon?: boolean;
  description?: string;
  episodeCount?: number;
  posterUrl?: string;
  badge?: ItemBadge;
}

export interface HomeSectionConfig {
  id: string;
  order: number;
  type: HomeSectionType;
  title: string;
  banners?: HomeBannerConfig[];
  items?: HomeItemConfig[];
}

export interface HomeScreenConfig {
  sections: HomeSectionConfig[];
}

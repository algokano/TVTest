export type TVDirection = 'up' | 'down' | 'left' | 'right';

export type TVControlKey = TVDirection | 'select' | 'back' | 'playPause';

export interface TVKeyPressHandlers {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onSelect?: () => void;
  onBack?: () => void;
  onPlayPause?: () => void;
}

export type TVFocusGridMode = 'free' | 'fixed-left';

export interface TVFocusGridConfig {
  itemCount: number;
  initialIndex?: number;
  mode?: TVFocusGridMode;
  rowIndex: number;
}

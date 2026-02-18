import { useTVEventHandler } from 'react-native';

import type { TVKeyPressHandlers, TVControlKey } from './types';

const mapEventTypeToKey = (eventType: string): TVControlKey | null => {
  switch (eventType) {
    case 'up':
    case 'down':
    case 'left':
    case 'right':
      return eventType;
    case 'select':
    case 'playPause':
    case 'menu':
      return eventType === 'menu' ? 'back' : (eventType as TVControlKey);
    default:
      return null;
  }
};

export const useTVKeyPress = (handlers: TVKeyPressHandlers) => {
  useTVEventHandler(evt => {
    const key = mapEventTypeToKey(evt.eventType);
    if (!key) {
      return;
    }

    switch (key) {
      case 'up':
        handlers.onUp?.();
        break;
      case 'down':
        handlers.onDown?.();
        break;
      case 'left':
        handlers.onLeft?.();
        break;
      case 'right':
        handlers.onRight?.();
        break;
      case 'select':
        handlers.onSelect?.();
        break;
      case 'back':
        handlers.onBack?.();
        break;
      case 'playPause':
        handlers.onPlayPause?.();
        break;
      default:
        break;
    }
  });
};

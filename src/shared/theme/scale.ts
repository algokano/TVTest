import { Platform, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DESIGN_WIDTH = 1920;

/**
 * Scales a pixel value designed for tvOS (1920-wide coordinate system)
 * down to the appropriate size for Android TV dp units.
 * Returns the value unchanged on iOS/tvOS.
 */
export function s(size: number): number {
  if (Platform.OS === 'ios') {
    return size;
  }
  return Math.round(size * (SCREEN_WIDTH / DESIGN_WIDTH));
}

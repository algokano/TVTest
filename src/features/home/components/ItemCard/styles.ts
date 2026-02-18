import { StyleSheet } from 'react-native';

import { colors, spacing } from '@shared/theme';

export const CARD_WIDTH = 185;
export const CARD_HEIGHT = 278;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.backgroundElevated,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  cardFocused: {
    borderColor: colors.borderFocused,
    transform: [{ scale: 1.05 }],
  },
  posterContainer: {
    width: '100%',
    height: CARD_HEIGHT,
    backgroundColor: '#1a1a2e',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTop: {
    backgroundColor: colors.primary,
  },
  badgeNew: {
    backgroundColor: colors.badgeGreen,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default styles;

import { StyleSheet } from 'react-native';

import { colors, spacing, s } from '@shared/theme';

export const CARD_WIDTH = s(200);
export const CARD_HEIGHT = s(300);
export const BORDER_RADIUS = s(16);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: colors.backgroundElevated,
    borderWidth: s(3),
    borderColor: 'transparent',
  },
  cardFocused: {
    borderColor: colors.borderFocused,
    width: s(240),
    height: s(360),
  },
  posterContainer: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
  },
  poster: {
    width: '100%',
    height: s(360),
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  badgeTop: {
    backgroundColor: colors.primary,
  },
  badgeNew: {
    backgroundColor: colors.badgeGreen,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: s(16),
    fontWeight: '800',
    letterSpacing: s(0.5),
  },
  title: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: s(15),
    fontWeight: '500',
  },
});

export default styles;

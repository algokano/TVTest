import { StyleSheet } from 'react-native';

import { colors, spacing, s } from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: s(24),
  },
  topBarButton: {
    width: s(48),
    height: s(48),
    borderRadius: s(24),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: s(2),
    borderColor: 'transparent',
  },
  topBarButtonFocused: {
    borderColor: colors.borderFocused,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  bottomSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: s(16),
  },
  episodeInfo: {
    gap: s(4),
  },
  episodeTitle: {
    color: colors.textPrimary,
    fontSize: s(28),
    fontWeight: '700',
  },
  showInfo: {
    color: colors.textSecondary,
    fontSize: s(18),
    fontWeight: '400',
    opacity: 0.9,
  },
});

export default styles;

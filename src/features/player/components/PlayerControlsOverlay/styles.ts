import { StyleSheet } from 'react-native';

import { colors, spacing, s } from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.lg,
    bottom: spacing.lg,
    right: spacing.lg,
    padding: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: s(16),
  },
  title: {
    color: colors.textPrimary,
    fontSize: s(22),
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  helper: {
    color: colors.textSecondary,
    fontSize: s(16),
  },
});

export default styles;

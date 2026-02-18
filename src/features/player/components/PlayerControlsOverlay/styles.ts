import { StyleSheet } from 'react-native';

import { colors, spacing } from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.lg,
    bottom: spacing.lg,
    right: spacing.lg,
    padding: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  helper: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default styles;

import { StyleSheet } from 'react-native';

import { colors, spacing, s } from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xs,
    color: colors.textSecondary,
    fontSize: s(16),
    fontWeight: '500',
  },
});

export default styles;

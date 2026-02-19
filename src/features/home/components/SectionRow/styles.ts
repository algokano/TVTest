import { StyleSheet } from 'react-native';

import { colors, spacing, s } from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    color: colors.textPrimary,
    fontSize: s(28),
    fontWeight: '700',
  },
  rowContainer: {
    position: 'relative',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
});

export default styles;

import { StyleSheet } from 'react-native';

import { colors, spacing } from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  banner: {
    width: 520,
    height: 260,
    marginRight: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  bannerFocused: {
    borderWidth: 4,
    borderColor: colors.borderFocused,
  },
  bannerInner: {
    justifyContent: 'flex-end',
  },
  bannerTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
});

export default styles;

import { StyleSheet } from 'react-native';

import { colors, spacing, s } from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: colors.textPrimary,
    fontSize: s(20),
  },

  heroWrapper: {
    paddingHorizontal: spacing.lg,
    overflow: 'hidden',
  },

  heroContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  heroTextColumn: {
    flex: 0.52,
    minHeight: s(380),
    marginRight: spacing.xl,
    paddingTop: spacing.sm,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  heroTitle: {
    color: colors.textPrimary,
    fontSize: s(32),
    fontWeight: '700',
    marginBottom: spacing.sm,
    lineHeight: s(44),
  },
  heroDescription: {
    color: colors.textSecondary,
    fontSize: s(24),
    lineHeight: s(36),
    marginTop: spacing.md,
  },
  heroPoster: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: s(900),
    height: s(580),
  },
});

export default styles;

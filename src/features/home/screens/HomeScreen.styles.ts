import { StyleSheet } from 'react-native';

import { colors, spacing } from '@shared/theme';

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
    fontSize: 20,
  },

  breadcrumbText: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontSize: 16,
    paddingHorizontal: spacing.lg,
  },

  heroWrapper: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  heroWrapperCollapsed: {
    height: 0,
    marginBottom: 0,
    paddingVertical: 0,
    opacity: 0,
  },

  heroContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  heroTextColumn: {
    flex: 1,
    marginRight: spacing.xl,
    paddingTop: spacing.sm,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  brandHeart: {
    color: colors.primary,
    fontSize: 32,
    marginRight: spacing.sm,
  },
  brandName: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    fontStyle: 'italic',
  },

  heroTitle: {
    color: colors.textPrimary,
    fontSize: 36,
    fontWeight: '700',
    marginBottom: spacing.sm,
    lineHeight: 44,
  },
  heroDescription: {
    color: colors.textSecondary,
    fontSize: 18,
    lineHeight: 28,
    marginTop: spacing.md,
  },

  heroPosterContainer: {
    width: 420,
    height: 580,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.backgroundElevated,
  },
  heroPoster: {
    width: '100%',
    height: '100%',
  },
});

export default styles;

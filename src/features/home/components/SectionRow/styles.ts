import { StyleSheet } from 'react-native';

import { colors, spacing } from '@shared/theme';
import { CARD_WIDTH, CARD_HEIGHT } from '../ItemCard/styles';

const TITLE_AREA = spacing.sm * 2 + 16;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
  },
  rowContainer: {
    position: 'relative',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  focusOverlay: {
    position: 'absolute',
    top: 0,
    left: spacing.lg,
    width: CARD_WIDTH,
    height: CARD_HEIGHT + TITLE_AREA,
    borderWidth: 3,
    borderColor: colors.borderFocused,
    borderRadius: 12,
  },
});

export default styles;

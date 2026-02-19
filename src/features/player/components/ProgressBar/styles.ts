import { StyleSheet } from 'react-native';

import { colors, s } from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(16),
  },
  playPauseButton: {
    width: s(44),
    height: s(44),
    borderRadius: s(22),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: s(2),
    borderColor: 'transparent',
  },
  playPauseButtonFocused: {
    borderColor: colors.borderFocused,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  timeText: {
    color: colors.textPrimary,
    fontSize: s(16),
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
    minWidth: s(50),
  },
  barContainer: {
    flex: 1,
    height: s(20),
    justifyContent: 'center',
  },
  barBackground: {
    height: s(3),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: s(2),
    overflow: 'visible',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: s(2),
  },
  barThumb: {
    position: 'absolute',
    top: s(-4),
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    backgroundColor: colors.primary,
    marginLeft: s(-5),
  },
});

export default styles;

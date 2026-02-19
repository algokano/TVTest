import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { s } from '@shared/theme';

interface PauseIconProps {
  size?: number;
  color?: string;
}

export const PauseIcon: React.FC<PauseIconProps> = ({
  size = 32,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={s(size)} height={s(size)} viewBox="0 0 24 24" fill="none">
      <Path d="M6 4h4v16H6V4z" fill={color} />
      <Path d="M14 4h4v16h-4V4z" fill={color} />
    </Svg>
  );
};

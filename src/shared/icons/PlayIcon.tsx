import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { s } from '@shared/theme';

interface PlayIconProps {
  size?: number;
  color?: string;
}

export const PlayIcon: React.FC<PlayIconProps> = ({
  size = 32,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={s(size)} height={s(size)} viewBox="0 0 24 24" fill="none">
      <Path d="M6 4l14 8-14 8V4z" fill={color} />
    </Svg>
  );
};

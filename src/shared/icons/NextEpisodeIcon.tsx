import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { s } from '@shared/theme';

interface NextEpisodeIconProps {
  size?: number;
  color?: string;
}

export const NextEpisodeIcon: React.FC<NextEpisodeIconProps> = ({
  size = 32,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={s(size)} height={s(size)} viewBox="0 0 24 24" fill="none">
      <Path d="M5 4l10 8-10 8V4z" fill={color} />
      <Path
        d="M19 5v14"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

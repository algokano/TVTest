import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { s } from '@shared/theme';

interface BackArrowIconProps {
  size?: number;
  color?: string;
}

export const BackArrowIcon: React.FC<BackArrowIconProps> = ({
  size = 32,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={s(size)} height={s(size)} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19l-7-7 7-7"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

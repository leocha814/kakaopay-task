import styled from '@emotion/styled';
import type { Property } from 'csstype';

import { getThemeValue, ThemeKeys } from '@/utils/utils';

export interface ButtonProps {
  fontSize?: ThemeKeys<'fontSize'> | Property.FontSize;
  fontWeight?: ThemeKeys<'fontWeight'> | Property.FontWeight;
  color?: ThemeKeys<'color'> | Property.Color;
  backgroundColor?: ThemeKeys<'color'> | Property.Color;
  width?: Property.Width;
  opacity?: Property.Opacity;
  borderRadius?: Property.BorderRadius;
  height?: Property.Height;
}

export const Button = styled('button')<ButtonProps>`
  color: ${({ color = 'primary', theme }) => getThemeValue(theme.color, color)};
  background-color: ${({ backgroundColor = 'kakao', theme }) =>
    getThemeValue(theme.color, backgroundColor)};
  width: ${({ width = '' }) => width};
  height: ${({ height = '100%' }) => height};
  opacity: ${({ opacity = 1 }) => opacity};
  border-radius: ${({ borderRadius = '30px' }) => borderRadius};
  margin: 0 16px;
  border: 0;
`;

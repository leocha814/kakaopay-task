import styled from '@emotion/styled';
import type { Property } from 'csstype';

import { getThemeValue, ThemeKeys } from '@/utils/utils';

export interface TypographyProps {
  fontSize?: ThemeKeys<'fontSize'> | Property.FontSize;
  fontWeight?: ThemeKeys<'fontWeight'> | Property.FontWeight;
  color?: ThemeKeys<'color'> | Property.Color;
  textAlign?: Property.TextAlign;
  width?: Property.Width;
  whiteSpace?: Property.WhiteSpace;
  opacity?: Property.Opacity;
}

export const Typography = styled('span')<TypographyProps>`
  font-size: ${({ fontSize = 'normal', theme }) =>
    getThemeValue(theme.fontSize, fontSize)};
  font-weight: ${({ fontWeight = 'regular', theme }) =>
    getThemeValue(theme.fontWeight, fontWeight)};
  color: ${({ color = 'primary', theme }) => getThemeValue(theme.color, color)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
  width: ${({ width }) => (width ? width : '100%')};
  white-space: ${({ whiteSpace }) => (whiteSpace ? whiteSpace : 'no-rwap')};
  opacity: ${({ opacity }) => opacity && opacity};
`;

import styled from '@emotion/styled';
import type { Property } from 'csstype';

export interface BoxProps {
  flexDirection?: Property.FlexDirection;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  width?: Property.Width;
  gap?: Property.Gap;
}

export const Box = styled('div')<BoxProps>`
  display: flex;
  flex-direction: ${({ flexDirection = 'row' }) => flexDirection};
  align-items: ${({ alignItems = 'center' }) => alignItems};
  justify-content: ${({ justifyContent = '' }) => justifyContent};
  width: ${({ width = '100%' }) => width};
  gap: ${({ gap = '4px' }) => gap};
`;

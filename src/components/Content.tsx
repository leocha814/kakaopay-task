import styled from '@emotion/styled';
import type { Property } from 'csstype';

export interface ContentProps {
  marginTop?: Property.MarginTop;
}

export const Content = styled('div')<ContentProps>`
  margin-top: ${({ marginTop = '16%' }) => marginTop};
  text-align: center;
`;

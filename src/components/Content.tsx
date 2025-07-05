import styled from '@emotion/styled';
import type { Property } from 'csstype';

export interface ContentProps {
  marginTop?: Property.MarginTop;
}

export const Content = styled('main')<ContentProps>`
  margin-top: ${({ marginTop = '16%' }) => marginTop};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

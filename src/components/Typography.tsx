import styled from '@emotion/styled';

export const Typography = styled('span')`
  font-size: ${({ theme }) => theme.fontSize.normal};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: left;
  width: 100%;
  white-space: nowrap;
`;

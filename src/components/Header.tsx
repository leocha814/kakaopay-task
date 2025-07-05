import styled from '@emotion/styled';

import { BackButton } from '@/components/BackButton';

const HeaderContainer = styled('header')`
  position: fixed;
  width: 100vw;
  top: 0;
  display: flex;
  align-items: center;
  background-color: white;
`;
const Title = styled('h1')`
  position: absolute;
  width: fit-content;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: ${({ theme }) => theme.fontSize.normal};
`;
export interface HeaderProps {
  title?: string;
  useHistoryBack?: boolean;
}

export const Header = ({ useHistoryBack = true, title = '' }: HeaderProps) => {
  return (
    <HeaderContainer>
      <BackButton
        onClick={() => {
          if (useHistoryBack) history.back();
        }}
      ></BackButton>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

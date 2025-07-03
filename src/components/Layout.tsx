import styled from '@emotion/styled';

import BackArrow from '@/assets/icons/back-arrow.svg';

const Container = styled('div')`
  height: 100dvh;
`;

export const Layout = () => {
  return (
    <Container>
      <img src={BackArrow}></img>
    </Container>
  );
};

import styled from '@emotion/styled';

import { useMyAccount } from '@/services/hooks';

const LayoutContainer = styled('div')`
  height: 100dvh;
`;

export const Layout = () => {
  const { data: test } = useMyAccount();
  console.log(test);
  return <LayoutContainer>test</LayoutContainer>;
};

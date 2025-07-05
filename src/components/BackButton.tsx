import styled from '@emotion/styled';

import BackArrowSvg from '@/assets/icons/back-arrow.svg';

export const Button = styled('button')`
  background: url(${BackArrowSvg}) no-repeat center center;
  background-size: 24px 24px;
  width: 40px;
  height: 40px;
  border: none;
`;

export const BackButton = ({
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return <Button aria-label="뒤로가기" {...props} />;
};

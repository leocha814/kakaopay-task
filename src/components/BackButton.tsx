import styled from '@emotion/styled';

import BackArrowSvg from '@/assets/icons/back-arrow.svg';

export const Image = styled('img')``;

export const BackButton = ({
  ...props
}: React.HTMLAttributes<HTMLImageElement>) => {
  return <Image alt="뒤로가기" src={BackArrowSvg} {...props} />;
};

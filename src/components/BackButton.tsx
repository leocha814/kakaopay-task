import styled from '@emotion/styled';

import BackArrowSvg from '@/assets/icons/back-arrow.svg';

export const Image = styled('img')``;

export const BackButton = ({
  ...props
}: React.HTMLAttributes<HTMLImageElement>) => {
  return <Image src={BackArrowSvg} {...props} />;
};

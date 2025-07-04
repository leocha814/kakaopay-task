import styled from '@emotion/styled';

import Loading from '@/assets/images/loading.png';
import { Box } from '@/components/Box';
import { Content } from '@/components/Content';
import { Typography } from '@/components/Typography';
import { CurrentState } from '@/types';
import { formatNumberWithCommas } from '@/utils/utils';

const Image = styled('img')`
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }
`;

interface TransferPendingProps extends CurrentState {
  amount: string;
}

export const TransferPending = ({
  holderName,
  amount,
}: TransferPendingProps) => {
  return (
    <Content>
      <section>
        <Image alt="송금중" src={Loading}></Image>
        <Box gap="8px" flexDirection="column">
          <Typography fontSize="24px" textAlign="center">
            {holderName}(으)로
          </Typography>
          <Typography fontSize="24px" textAlign="center">
            {formatNumberWithCommas(amount)}원을 보내는 중이에요.
          </Typography>
        </Box>
      </section>
    </Content>
  );
};

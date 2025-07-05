import styled from '@emotion/styled';

import Done from '@/assets/images/done.png';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Content } from '@/components/Content';
import { Typography } from '@/components/Typography';
import { CurrentState, MyInfo } from '@/types';
import { formatNumberWithCommas } from '@/utils/utils';

const Image = styled('img')`
  width: 64px;
  height: 64px;
`;

const BottomContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding-bottom: 50px;
  gap: 16px;
  width: 100dvw;
  bottom: 0;
`;

const OutAccountBox = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 14px;
  margin: 0 24px;

  & > span:nth-of-type(2n + 1) {
    text-align: left;
    color: ${({ theme }) => theme.color.labelSecondary};
  }
  & > span:nth-of-type(2n) {
    text-align: right;
    font-weight: bold;
  }
`;

interface SendSuccessProps extends CurrentState {
  amount: string;
  myAccountInfo?: MyInfo['account'];
  onClickConfirmButton: VoidFunction;
}

export const SendSuccess = ({
  bankName,
  accountNumber,
  myAccountInfo,
  holderName,
  amount,
  onClickConfirmButton,
}: SendSuccessProps) => {
  return (
    <>
      <Content>
        <Image src={Done}></Image>
        <Box gap="8px" flexDirection="column">
          <Typography fontSize="24px" textAlign="center">
            송금을 완료했어요.
          </Typography>
          <Typography
            fontSize="16px"
            textAlign="center"
            color="primary"
            opacity={0.56}
          >
            {bankName} {accountNumber}
            <br />
            {holderName}님에게 {formatNumberWithCommas(amount)}원을 보냈어요.
          </Typography>
        </Box>
      </Content>
      <BottomContainer>
        <OutAccountBox>
          <Typography>출금계좌</Typography>
          <Typography>
            {myAccountInfo?.bank.name} {myAccountInfo?.account_number}
          </Typography>
          <Typography>수수료</Typography>
          <Typography>무료</Typography>
        </OutAccountBox>
        <Button onClick={onClickConfirmButton} height="60px">
          확인
        </Button>
      </BottomContainer>
    </>
  );
};

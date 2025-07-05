import styled from '@emotion/styled';

import Fail from '@/assets/images/fail.png';
import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Content } from '@/components/Content';
import { Typography } from '@/components/Typography';
import { PostErrorResult } from '@/types';

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

interface TransferErrorProps extends PostErrorResult {
  onClickConfirmButton: VoidFunction;
}

export const TransferError = ({
  error_code,
  onClickConfirmButton,
}: TransferErrorProps) => {
  const errorTitle =
    error_code === 'ERROR_FAILED_TO_CONFIRM_TRANSFER'
      ? '송금 결과를 확인하지 못했어요.'
      : '송금을 완료하지 못했어요.';

  const errorContent =
    error_code === 'ERROR_FAILED_TO_CONFIRM_TRANSFER' ? (
      <>
        송금 확인이 늦어지고 있어요.
        <br />
        최종 결과는 송금내역 화면에서 확인하세요.
      </>
    ) : (
      <>
        정상적으로 처리되지 않아 송금이 실패했습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </>
    );
  return (
    <>
      <Content>
        <section>
          <Image alt="송금 에러" src={Fail}></Image>
          <Box gap="8px" flexDirection="column">
            <Typography textAlign="center" fontSize="24px">
              {errorTitle}
            </Typography>
            <Typography textAlign="center" fontSize="16px" color="error">
              {errorContent}
            </Typography>
          </Box>
        </section>
      </Content>
      <BottomContainer>
        <Button
          height="60px"
          color="error"
          backgroundColor={'errorSecondary'}
          onClick={onClickConfirmButton}
        >
          확인
        </Button>
      </BottomContainer>
    </>
  );
};

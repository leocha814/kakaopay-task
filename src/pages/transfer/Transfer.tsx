import styled from '@emotion/styled';
import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Content } from '@/components/Content';
import { Header } from '@/components/Header';
import { Keypad } from '@/components/Keypad';
import { Tooltip } from '@/components/Tooltip';
import { Typography } from '@/components/Typography';
import { useMyInfo, useTransfer } from '@/services/hooks';
import { formatNumberWithCommas } from '@/utils/utils';

import { TransferError } from './components/TransferError';
import { TransferPending } from './components/TransferPending';
import { TransferSuccess } from './components/TransferSuccess';

const ONE_DAY_LIMIT = 5000000;
const ONE_TIME_LIMIT = 2000000;

const Image = styled('img')`
  width: 40px;
  height: 40px;
  pointer-events: none;
`;

const AccountInfo = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const KeypadContainer = styled('div')`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding-bottom: 50px;
  gap: 16px;
  width: 100dvw;
  bottom: 0;
`;

const Transfer = () => {
  const {
    state: { urlImage, bankName, accountNumber, holderName, bankCode },
  } = useLocation();
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMesssage] = useState('');
  const navigate = useNavigate();

  const { data: myInfo } = useMyInfo();
  const {
    mutate: transfer,
    isPending,
    isSuccess,
    isError,
  } = useTransfer({
    onSuccess: (res) => {
      setAmount(String(res.amount));
    },
    onError: (res) => {
      setErrorMesssage(res?.response?.data.error_code || 'UNKNOWN');
    },
  });

  const myAccountNumber =
    myInfo?.account?.account_number?.replaceAll('-', '').slice(-4) || '';

  const oneDayLimitAmount = useMemo(
    () => ONE_DAY_LIMIT - Number(myInfo?.transfer?.one_day_amount || ''),
    [myInfo?.transfer?.one_day_amount],
  );

  const overOneDayLimit = useMemo(
    () => Number(amount) > oneDayLimitAmount,
    [oneDayLimitAmount, amount],
  );
  const overOneTimeLimit = useMemo(
    () => Number(amount) > ONE_TIME_LIMIT,
    [amount],
  );

  const content = useMemo(() => {
    if (
      overOneDayLimit &&
      overOneTimeLimit &&
      oneDayLimitAmount < ONE_TIME_LIMIT
    ) {
      return `${formatNumberWithCommas(String(oneDayLimitAmount))}원 송금 가능 (1일 한도 초과)`;
    } else if (overOneDayLimit) {
      return `${formatNumberWithCommas(String(oneDayLimitAmount))}원 송금 가능 (1일 한도 초과)`;
    } else if (overOneTimeLimit) {
      return `${formatNumberWithCommas(String(ONE_TIME_LIMIT))}원 송금 가능 (1회 한도 초과)`;
    }
  }, [overOneDayLimit, overOneTimeLimit, oneDayLimitAmount]);

  const handleKeyPress = useCallback(
    (value: string) => {
      if (overOneDayLimit || overOneTimeLimit) return;
      setAmount((prev) => {
        if (Number(prev) + Number(value) === 0) return '';
        return prev + value;
      });
    },
    [overOneDayLimit || overOneTimeLimit],
  );

  const handleAmountChip = useCallback(
    (value: number) => {
      if (overOneDayLimit || overOneTimeLimit) return;
      setAmount((prev) => String(Number(prev) + value));
    },
    [overOneDayLimit || overOneTimeLimit],
  );

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleConfirmButton = useCallback(() => {
    transfer({
      bankCode,
      accountNumber,
      amount: Number(amount),
    });
  }, [bankCode, accountNumber, amount]);

  const handleSuccessConfirmButton = () => {
    navigate('/accounts', {
      state: {},
    });
  };

  const handleErrorConfirmButton = () => {
    navigate('/accounts', {
      state: {},
    });
  };

  if (isPending)
    return (
      <TransferPending
        amount={amount}
        {...{ urlImage, bankName, accountNumber, holderName, bankCode }}
      ></TransferPending>
    );
  if (isSuccess)
    return (
      <TransferSuccess
        onClickConfirmButton={handleSuccessConfirmButton}
        amount={amount}
        myAccountInfo={myInfo?.account}
        {...{ urlImage, bankName, accountNumber, holderName, bankCode }}
      ></TransferSuccess>
    );
  if (isError)
    return (
      <TransferError
        onClickConfirmButton={handleErrorConfirmButton}
        error_code={errorMessage}
      ></TransferError>
    );

  return (
    <>
      <Header></Header>
      <AccountInfo>
        <Box flexDirection="column" gap={'8px'}>
          <Image src={urlImage}></Image>
          <Typography
            textAlign="center"
            fontWeight={'normal'}
            color={'labelSecondary'}
          >
            {bankName} {accountNumber}
          </Typography>
        </Box>
        <Box flexDirection="column" gap={'8px'}>
          <Typography textAlign="center" fontSize={'26px'}>
            {holderName} 님에게
          </Typography>
          <Tooltip
            show={overOneDayLimit || overOneTimeLimit}
            backgroundColor="error"
            content={content}
          >
            <Typography
              color={overOneDayLimit || overOneTimeLimit ? 'error' : 'primary'}
              textAlign="center"
              fontSize={'26px'}
              opacity={amount ? 1 : 0.16}
            >
              {amount
                ? `${formatNumberWithCommas(amount)}원`
                : '얼마를 보낼까요?'}
            </Typography>
          </Tooltip>
          <Typography textAlign="center" color="labelSecondary">
            출금 계좌: {myInfo?.account?.bank.name}
            {myAccountNumber}(
            {formatNumberWithCommas(String(myInfo?.account?.balance))}
            원)
          </Typography>
        </Box>
      </AccountInfo>
      <KeypadContainer>
        <Keypad
          onKeyPress={handleKeyPress}
          onClickChip={handleAmountChip}
          backspaceProps={{
            onClick: handleBackspace,
          }}
        ></Keypad>
        <Button
          onClick={handleConfirmButton}
          height="60px"
          disabled={overOneDayLimit || overOneTimeLimit || !amount}
          backgroundColor={
            overOneDayLimit || overOneTimeLimit || !amount
              ? 'kakaoSecondary'
              : 'kakao'
          }
        >
          확인
        </Button>
      </KeypadContainer>
    </>
  );
};

export default Transfer;

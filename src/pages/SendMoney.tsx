import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from '@/components/Box';
import { Content } from '@/components/Content';
import { Header } from '@/components/Header';
import { Keypad } from '@/components/Keypad';
import { Tooltip } from '@/components/Tooltip';
import { Typography } from '@/components/Typography';
import { useMyInfo } from '@/services/hooks';
import { formatNumberWithCommas } from '@/utils/utils';

const Image = styled('img')`
  width: 40px;
  height: 40px;
`;

const AccountInfo = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SendMoney = () => {
  const {
    state: { urlImage, bankName, accountNumber, holderName },
  } = useLocation();
  const [ammount, setAmmount] = useState('');

  const { data: myInfo } = useMyInfo();

  const myAccountNumber =
    myInfo?.account?.account_number?.replaceAll('-', '').slice(-4) || '';

  const oneDayAmount = myInfo?.transfer?.one_day_amount || '';

  const overOneDayAmount = useMemo(
    () => Number(myInfo?.transfer?.one_day_amount || 0) < Number(ammount),
    [myInfo, ammount],
  );

  const handleKeyPress = useCallback(
    (value: string) => {
      if (overOneDayAmount) return;
      setAmmount((prev) => {
        if (Number(prev) + Number(value) === 0) return '';
        return prev + value;
      });
    },
    [overOneDayAmount],
  );

  const handleAmountChip = useCallback(
    (value: number) => {
      if (overOneDayAmount) return;
      setAmmount((prev) => String(Number(prev) + value));
    },
    [overOneDayAmount],
  );

  const handleBackspace = () => {
    setAmmount((prev) => prev.slice(0, -1));
  };

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
            show={overOneDayAmount}
            backgroundColor="error"
            content={`${formatNumberWithCommas(String(oneDayAmount))}원 송금 가능 (1일 한도 초과)`}
          >
            <Typography
              color={overOneDayAmount ? 'error' : 'primary'}
              textAlign="center"
              fontSize={'26px'}
              opacity={ammount ? 1 : 0.16}
            >
              {ammount
                ? `${formatNumberWithCommas(ammount)}원`
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
      <Keypad
        onKeyPress={handleKeyPress}
        onClickChip={handleAmountChip}
        backspaceProps={{
          onClick: handleBackspace,
        }}
      ></Keypad>
    </>
  );
};

export default SendMoney;

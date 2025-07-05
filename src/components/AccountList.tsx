import styled from '@emotion/styled';
import { useState } from 'react';

import arrow from '@/assets/icons/arrow.svg';
import { BookmarkIcon, BookmarkIconProps } from '@/components/BookmarkIcon';
import { Box } from '@/components/Box';
import { Typography } from '@/components/Typography';

const BankLogo = styled('img')`
  width: 36px;
  height: 36px;
`;

const Image = styled('img')`
  width: 24px;
  height: 24px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ expanded = false }: { expanded?: boolean }) =>
    expanded && 'rotate(180deg)'};
`;

const ListContainer = styled(Box)`
  flex-direction: column;
  padding: 0 24px;
`;

const AccountContainer = styled(Box)`
  padding: 12px 0;
  gap: 12px;
`;

interface AccountProps {
  imageUrl: string;
  holderName: string;
  bankName: string;
  accountNumber: string;
  id: number;
  bookmarkInfo: BookmarkIconProps;
  handleAccountClick?: () => void;
}

const Account = ({
  imageUrl,
  holderName,
  bankName,
  accountNumber,
  bookmarkInfo,
  handleAccountClick,
}: AccountProps) => {
  return (
    <AccountContainer onClick={handleAccountClick}>
      <BankLogo src={imageUrl || ''}></BankLogo>
      <Box flexDirection="column">
        <Typography>{holderName ? holderName : '별명 미 설정'}</Typography>
        <Typography>
          {bankName} {accountNumber}
        </Typography>
      </Box>
      <BookmarkIcon {...bookmarkInfo}></BookmarkIcon>
    </AccountContainer>
  );
};

export interface AccountListProps {
  accountList?: AccountProps[];
  title: string;
  useExpand?: boolean;
}

export const AccountList = ({
  useExpand = true,
  accountList,
  title,
}: AccountListProps) => {
  const [isExpanded, setIsExpanded] = useState(!useExpand);
  const totalCount = accountList?.length || 0;
  const visibleAccounts = isExpanded ? accountList : accountList?.slice(0, 2);
  const hiddenCount = totalCount - (visibleAccounts?.length || 0);

  return (
    <ListContainer>
      <Box>
        <Typography>{title}</Typography>
        {useExpand && (
          <Box justifyContent="end">
            {isExpanded ? `${totalCount}개` : `+${hiddenCount}개`}
            <Image
              expanded={!isExpanded}
              onClick={() => setIsExpanded((prev) => !prev)}
              src={arrow}
            ></Image>
          </Box>
        )}
      </Box>
      {visibleAccounts?.map((account) => (
        <Account key={account.id} {...account}></Account>
      ))}
    </ListContainer>
  );
};

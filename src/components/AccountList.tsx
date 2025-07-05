import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import arrow from '@/assets/icons/arrow.svg';
import { BookmarkIcon, BookmarkIconProps } from '@/components/BookmarkIcon';
import { Box } from '@/components/Box';
import { Typography } from '@/components/Typography';

const BankLogo = styled('img')`
  width: 36px;
  height: 36px;
  pointer-events: none;
`;

const Image = styled('img')`
  width: 24px;
  height: 24px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ expanded = false }: { expanded?: boolean }) =>
    expanded && 'rotate(180deg)'};
`;

const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.normal};
  font-weight: regualar;
  white-space: nowarp;
  width: 100%;
  text-align: left;
`;

const ListContainer = styled('section')`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;
  gap: 16px;
`;

const AccountContainer = styled('li')`
  display: flex;
`;

const ListLink = styled(Link)`
  text-decoration: none;
  display: flex;
  width: 100%;
  display: flex;
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
  bankCode: string;
}

const Account = ({
  imageUrl,
  holderName,
  bankName,
  accountNumber,
  bookmarkInfo,
  bankCode,
}: AccountProps) => {
  return (
    <AccountContainer role="list">
      <ListLink
        state={{
          imageUrl,
          holderName,
          accountNumber,
          bankName,
          bankCode,
        }}
        to={'/transfer'}
      >
        <BankLogo src={imageUrl || ''}></BankLogo>
        <Box flexDirection="column">
          <Typography fontSize="16px">
            {holderName ? holderName : '별명 미설정'}
          </Typography>
          <Typography fontSize="13px" color="labelSecondary">
            {bankName} {accountNumber}
          </Typography>
        </Box>
      </ListLink>
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
        <Title>{title}</Title>
        {useExpand && (
          <Box justifyContent="end">
            {isExpanded ? `${totalCount}개` : `+${hiddenCount}개`}
            <Image
              expanded={!isExpanded}
              alt={isExpanded ? '숨기기' : '보이기'}
              onClick={() => setIsExpanded((prev) => !prev)}
              src={arrow}
            ></Image>
          </Box>
        )}
      </Box>
      <ul>
        {visibleAccounts?.map((account) => (
          <Account key={account.id} {...account}></Account>
        ))}
      </ul>
    </ListContainer>
  );
};

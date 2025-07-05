import styled from '@emotion/styled';

import { AccountList } from '@/components/AccountList';
import { BookmarkIconProps } from '@/components/BookmarkIcon';
import { Header } from '@/components/Header';
import {
  useAddBookmarkAccount,
  useBookmarkAccounts,
  useDeleteBookmarkAccount,
  useMyAccount,
  useRecentTransferAccounts,
} from '@/services/hooks';

const Main = styled('main')`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  gap: 8px;
  width: 100%;
`;

const Accounts = () => {
  const { data: bookmarkAccounts, refetch: refetchBookmarker } =
    useBookmarkAccounts();
  const { data: myAccount } = useMyAccount();
  const { data: recentTransferAccounts } = useRecentTransferAccounts();

  const { mutate: addBookmark } = useAddBookmarkAccount({
    onSuccess: () => {
      refetchBookmarker();
    },
  });
  const { mutate: deleteBookmark } = useDeleteBookmarkAccount({
    onSuccess: () => {
      refetchBookmarker();
    },
  });

  const bankList = myAccount?.map((account) => account.bank);

  const handleToggle = ({
    isBookmarked,
    id,
    accountNumber = '',
  }: Omit<BookmarkIconProps, 'onToggle'>) => {
    if (isBookmarked) {
      deleteBookmark(String(id));
    } else {
      addBookmark({ bankAccountNumber: accountNumber });
    }
  };

  return (
    <>
      <Header title="받을 계좌 선택" useHistoryBack={false}></Header>
      <Main>
        <AccountList
          title="내 계좌"
          accountList={
            myAccount?.map(({ bank, account_number, id }) => {
              const bookmark = bookmarkAccounts?.find(
                ({ bank_account_number }) =>
                  bank_account_number === account_number,
              );
              return {
                imageUrl: bank.image_url,
                holderName: bank.bank_nickname,
                bankName: bank.name,
                accountNumber: account_number,
                id,
                bankCode: bank.code,
                bookmarkInfo: {
                  onToggle: handleToggle,
                  isBookmarked: !!bookmark,
                  id: bookmark?.id,
                  accountNumber:
                    bookmark?.bank_account_number ?? account_number,
                },
              };
            }) || []
          }
        />
        <AccountList
          title="최근"
          useExpand={false}
          accountList={
            recentTransferAccounts?.map(
              ({ bank, holder_name, account_number, id }) => {
                const bookmark = bookmarkAccounts?.find(
                  ({ bank_account_number }) =>
                    bank_account_number === account_number,
                );
                const bankInfo = bankList?.find((b) => b.code === bank.code);
                return {
                  imageUrl: bank.image_url,
                  bankCode: bankInfo?.code || '',
                  holderName: holder_name,
                  accountNumber: account_number,
                  id,
                  bookmarkInfo: {
                    onToggle: handleToggle,
                    isBookmarked: !!bookmark,
                    id: bookmark?.id,
                    accountNumber:
                      bookmark?.bank_account_number ?? account_number,
                  },
                  bankName: bankInfo?.name || '',
                };
              },
            ) || []
          }
        />
      </Main>
    </>
  );
};

export default Accounts;

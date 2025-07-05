import { useNavigate } from 'react-router-dom';

import { AccountList } from '@/components/AccountList';
import { BookmarkIconProps } from '@/components/BookmarkIcon';
import { Box } from '@/components/Box';
import { Content } from '@/components/Content';
import { Header } from '@/components/Header';
import {
  useAddBookmarkAccount,
  useBookmarkAccounts,
  useDeleteBookmarkAccount,
  useMyAccount,
  useRecentTransferAccounts,
} from '@/services/hooks';

const ReceiveAccountSelect = () => {
  const navigate = useNavigate();
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

  const handleAccountClick = ({
    accountNumber,
    bankName,
    holderName,
    urlImage,
  }: {
    accountNumber: string;
    bankName: string;
    holderName: string;
    urlImage: string;
  }) => {
    navigate('/send-money', {
      state: { accountNumber, bankName, urlImage, holderName },
    });
  };

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
    <Content marginTop={'44px'}>
      <Header title="받을 계좌 선택" useHistoryBack={false}></Header>
      <Box flexDirection="column" gap={'16px'}>
        <AccountList
          title="내 계좌"
          accountList={
            myAccount?.map(({ bank, account_number, holder_name, id }) => {
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
                bookmarkInfo: {
                  onToggle: handleToggle,
                  isBookmarked: !!bookmark,
                  id: bookmark?.id,
                  accountNumber:
                    bookmark?.bank_account_number ?? account_number,
                },
                handleAccountClick: () =>
                  handleAccountClick({
                    urlImage: bank.image_url,
                    bankName: bank.name,
                    accountNumber: account_number,
                    holderName: holder_name,
                  }),
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
                  handleAccountClick: () =>
                    handleAccountClick({
                      urlImage: bank.image_url,
                      holderName: holder_name,
                      accountNumber: account_number,
                      bankName: bankInfo?.name || '',
                    }),
                };
              },
            ) || []
          }
        />
      </Box>
    </Content>
  );
};

export default ReceiveAccountSelect;

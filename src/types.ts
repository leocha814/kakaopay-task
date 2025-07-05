interface Bank {
  code: string;
  name: string;
  image_url: string;
  aliases: string[];
  bank_nickname: string;
}

interface Account {
  id: number;
  logo: string;
  balance: number;
  account_number: string;
  holder_name: string;
  bank: Bank;
}

interface RecentTransferAccount {
  id: number;
  account_number: string;
  holder_name: string;
  bank: {
    code: string;
    image_url: string;
  };
}

interface BookmarkAccount {
  bank_account_number: string;
  id: number;
}

interface BookmarkAccountBody {
  bankAccountNumber: string;
}

interface Limit {
  limit: number;
  type: string;
  message: string;
}

interface MyInfo {
  account: {
    balance: number;
    account_number: string;
    holder_name: string;
    bank: {
      code: string;
      name: string;
      image_url: string;
    };
  };
  transfer: {
    one_day_amount: number;
  };
}

interface Transfer {
  bank_code: string;
  account_number: string;
  amount: number;
}

interface TransferBody {
  bankCode: string;
  accountNumber: string;
  amount: number;
}

interface GetErrorResult {
  error: string;
}

interface PostErrorResult {
  error_code: string;
}

interface CurrentState {
  accountNumber: string;
  bankName: string;
  holderName: string;
  urlImage: string;
  bankCode: string;
}

export type {
  Account,
  Bank,
  BookmarkAccount,
  BookmarkAccountBody,
  CurrentState,
  GetErrorResult,
  Limit,
  MyInfo,
  PostErrorResult,
  RecentTransferAccount,
  Transfer,
  TransferBody,
};

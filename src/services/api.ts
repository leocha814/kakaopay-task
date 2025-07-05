import {
  Account,
  BookmarkAccount,
  BookmarkAccountBody,
  MyInfo,
  RecentTransferAccount,
  Transfer,
  TransferBody,
} from '@/types';
import { api } from '@/utils/api';

export async function getMyAccount(): Promise<Account[]> {
  const { data } = await api<Account[]>({
    url: '/kakaopay/my_accounts',
    method: 'get',
  });
  return data;
}
export async function getMyAccountItem(id: string): Promise<Account> {
  const { data } = await api<Account>({
    url: `/kakaopay/my_accounts/${id}`,
    method: 'get',
  });
  return data;
}

export async function getRecentTransferAccounts(): Promise<
  RecentTransferAccount[]
> {
  const { data } = await api<RecentTransferAccount[]>({
    url: '/kakaopay/recents_transfer_accounts',
    method: 'get',
  });
  return data;
}

export async function getRecentTransferAccountItem(
  id: string,
): Promise<RecentTransferAccount> {
  const { data } = await api<RecentTransferAccount>({
    url: `/kakaopay/recents_transfer_accounts/${id}`,
    method: 'get',
  });
  return data;
}

export async function getBookmarkAccounts(): Promise<BookmarkAccount[]> {
  const { data } = await api<BookmarkAccount[]>({
    url: '/kakaopay/bookmark_accounts',
    method: 'get',
  });
  return data;
}

export async function addBookmarkAccounts(
  request: BookmarkAccountBody,
): Promise<BookmarkAccount> {
  const { data } = await api<BookmarkAccount>({
    url: '/kakaopay/bookmark_accounts',
    method: 'post',
    data: request,
  });
  return data;
}

export async function deleteBookmarkAccounts(
  id: string,
): Promise<BookmarkAccount> {
  const { data } = await api<BookmarkAccount>({
    url: `/kakaopay/bookmark_accounts/${id}`,
    method: 'delete',
  });
  return data;
}

export async function getMyInfo(): Promise<MyInfo> {
  const { data } = await api<MyInfo>({
    url: '/kakaopay/my_info',
    method: 'get',
  });
  return data;
}

export async function transfer(request: TransferBody): Promise<Transfer> {
  const { data } = await api<Transfer>({
    url: `/kakaopay/transfer`,
    method: 'post',
    data: request,
  });
  return data;
}

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
  const { data } = await api({
    url: '/my_accounts',
    method: 'get',
  });
  return data;
}
export async function getMyAccountItem(id: string): Promise<Account> {
  const { data } = await api({
    url: `/my_accounts/${id}`,
    method: 'get',
  });
  return data;
}

export async function getRecentTransferAccounts(): Promise<
  RecentTransferAccount[]
> {
  const { data } = await api({
    url: '/recents_transfer_accounts',
    method: 'get',
  });
  return data;
}

export async function getRecentTransferAccountItem(
  id: string,
): Promise<RecentTransferAccount> {
  const { data } = await api({
    url: `/recents_transfer_accounts/${id}`,
    method: 'get',
  });
  return data;
}

export async function getBookmarkAccounts(): Promise<BookmarkAccount[]> {
  const { data } = await api({
    url: '/bookmark_accounts',
    method: 'get',
  });
  return data;
}

export async function addBookmarkAccounts(
  request: BookmarkAccountBody,
): Promise<BookmarkAccount> {
  const { data } = await api({
    url: '/bookmark_accounts',
    method: 'post',
    data: request,
  });
  return data;
}

export async function deleteBookmarkAccounts(
  id: string,
): Promise<BookmarkAccount> {
  const { data } = await api({
    url: `/bookmark_accounts/${id}`,
    method: 'delete',
  });
  return data;
}

export async function getMyInfo(): Promise<MyInfo> {
  const { data } = await api({
    url: '/my_info',
    method: 'get',
  });
  return data;
}

export async function transfer(request: TransferBody): Promise<Transfer> {
  const { data } = await api({
    url: `/transfer`,
    method: 'post',
    data: request,
  });
  return data;
}

import { Account } from '@/types';
import { api } from '@/utils/api';

export async function getMyAccount(): Promise<Account> {
  const { data } = await api({
    url: '/my_accounts',
    method: 'get',
  });
  return data;
}

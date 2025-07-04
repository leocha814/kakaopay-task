import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { GetErrorResult, RecentTransferAccount } from '@/types';

import { getRecentTransferAccounts } from '../api';

export const useRecentTransferAccounts = (
  options?: Omit<
    UseQueryOptions<RecentTransferAccount, AxiosError<GetErrorResult>>,
    'queryKey'
  >,
) => {
  return useQuery({
    queryFn: getRecentTransferAccounts,
    queryKey: ['recent-transfer-accounts'],
    throwOnError: true,
    ...options,
  });
};

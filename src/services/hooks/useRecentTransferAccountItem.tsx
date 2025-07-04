import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { GetErrorResult, RecentTransferAccount } from '@/types';

import { getRecentTransferAccountItem } from '../api';

export const useRecentTransferAccountItem = (
  id: string,
  options?: Omit<
    UseQueryOptions<RecentTransferAccount, AxiosError<GetErrorResult>>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['recent-transfer-account-item', id],
    queryFn: () => getRecentTransferAccountItem(id),
    throwOnError: true,
    ...options,
  });
};

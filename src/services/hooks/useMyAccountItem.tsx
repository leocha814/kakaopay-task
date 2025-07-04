import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Account, GetErrorResult } from '@/types';

import { getMyAccountItem } from '../api';

export const useMyAccountItem = (
  id: string,
  options?: Omit<
    UseQueryOptions<Account, AxiosError<GetErrorResult>>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['my-account-item', id],
    queryFn: () => getMyAccountItem(id),
    throwOnError: true,
    ...options,
  });
};

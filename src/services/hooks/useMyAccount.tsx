import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Account, GetErrorResult } from '@/types';

import { getMyAccount } from '../api';

export const useMyAccount = (
  options?: Omit<
    UseQueryOptions<Account[], AxiosError<GetErrorResult>>,
    'queryKey'
  >,
) => {
  return useQuery({
    queryFn: getMyAccount,
    queryKey: ['my-account'],
    throwOnError: true,
    ...options,
  });
};

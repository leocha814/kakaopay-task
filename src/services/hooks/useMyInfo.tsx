import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { GetErrorResult, MyInfo } from '@/types';

import { getMyInfo } from '../api';

export const useMyInfo = (
  options?: Omit<
    UseQueryOptions<MyInfo, AxiosError<GetErrorResult>>,
    'queryKey'
  >,
) => {
  return useQuery({
    queryFn: getMyInfo,
    queryKey: ['my-info'],
    staleTime: 0,
    throwOnError: true,
    ...options,
  });
};

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarkAccount, GetErrorResult } from '@/types';

import { getBookmarkAccounts } from '../api';

export const useBookmarkAccounts = (
  options?: Omit<
    UseQueryOptions<BookmarkAccount[], AxiosError<GetErrorResult>>,
    'queryKey'
  >,
) => {
  return useQuery({
    queryFn: getBookmarkAccounts,
    queryKey: ['bookmark-accounts'],
    throwOnError: true,
    ...options,
  });
};

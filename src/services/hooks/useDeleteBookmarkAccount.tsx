import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarkAccount, PostErrorResult } from '@/types';

import { deleteBookmarkAccounts } from '../api';

export const useDeleteBookmarkAccount = (
  options?: Omit<
    UseMutationOptions<
      BookmarkAccount,
      AxiosError<PostErrorResult>,
      string,
      unknown
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: deleteBookmarkAccounts,
    ...options,
  });
};

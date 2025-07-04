import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarkAccount, BookmarkAccountBody, PostErrorResult } from '@/types';

import { addBookmarkAccounts } from '../api';

export const useAddBookmarkAccount = (
  options?: Omit<
    UseMutationOptions<
      BookmarkAccount,
      AxiosError<PostErrorResult>,
      BookmarkAccountBody,
      unknown
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: addBookmarkAccounts,
    ...options,
  });
};

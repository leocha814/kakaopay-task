import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PostErrorResult, Transfer, TransferBody } from '@/types';

import { transfer } from '../api';

export const useTransfer = (
  options?: Omit<
    UseMutationOptions<
      Transfer,
      AxiosError<PostErrorResult>,
      TransferBody,
      unknown
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: transfer,
    ...options,
  });
};

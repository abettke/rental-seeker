import { UseGetProps } from 'restful-react/dist/useGet';
import { UseMutateProps } from 'restful-react';

export const rentals: Record<string, UseGetProps<any, any> | UseMutateProps<any, any, any>> = {
  list: { path: 'rentals' },
  create: { path: 'rentals', verb: 'POST' },
  delete: { path: 'rentals', verb: 'DELETE' },
};

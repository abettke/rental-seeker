import { UseMutateProps } from 'restful-react/dist/useMutate';

export const auth: Record<string, UseMutateProps<any, any, any>> = {
  login: { verb: 'POST', path: 'auth/login' },
  register: { verb: 'POST', path: 'auth/register' },
};

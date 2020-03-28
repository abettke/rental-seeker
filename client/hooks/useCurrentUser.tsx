import { decode } from 'jsonwebtoken';
import { useAuth } from './useAuth';

export const useCurrentUser = (): Record<string, any> => {
  const { auth } = useAuth();
  return decode(auth.accessToken) as Record<string, any>;
};

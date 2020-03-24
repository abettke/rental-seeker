import { useContext } from 'react';
import { AuthContext, AuthContextInterface } from '../context/AuthContext';

export const useAuth = (): AuthContextInterface => {
  return useContext(AuthContext);
};

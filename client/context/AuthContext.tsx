import React from 'react';

export class Auth {
  accessToken: string;
}

export class AuthContextInterface {
  auth: Auth;
  setAuth: (auth: Auth) => void;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  auth: null,
  setAuth: () => null,
});

export const AuthProvider: React.FC = (props: React.ComponentProps<any>) => {
  const initialAuth = localStorage.getItem('auth');
  const [auth, setAuth] = React.useState<Auth>(initialAuth ? JSON.parse(initialAuth) : null);
  const setAuthWithLocalStorage = (auth: Auth) => {
    setAuth(auth);
    localStorage.setItem('auth', JSON.stringify(auth));
  };

  return(
    <AuthContext.Provider
      value={{
        auth,
        setAuth: setAuthWithLocalStorage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
};

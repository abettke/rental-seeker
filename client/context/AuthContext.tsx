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
  const [auth, setAuth] = React.useState<Auth>(null);
  return(
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
};

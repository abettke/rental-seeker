import React from 'react';
import { decode } from 'jsonwebtoken'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Routes } from './index';

export const AuthRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const location = useLocation();
  const { auth } = useAuth();
  const NOW = Math.round(new Date().getTime() / 1000);

  return (auth?.accessToken && decode(auth.accessToken)['exp'] > NOW ?
    <Route {...props} /> :
    <Redirect
      to={{
        pathname: Routes.LOGIN,
        state: { from: location },
      }}
    />
  );
};

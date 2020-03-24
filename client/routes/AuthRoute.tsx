import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Routes } from './index';

export const AuthRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const location = useLocation();
  const { auth } = useAuth();

  return (auth?.accessToken ?
    <Route {...props} /> :
    <Redirect
      to={{
        pathname: Routes.LOGIN,
        state: { from: location },
      }}
    />
  );
};

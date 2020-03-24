import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthRoute, Routes } from './routes';
import { Login, Register, Rentals } from './pages';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} render={() => <Login />} exact />
          <Route path={Routes.REGISTER} render={() => <Register />} exact />
          <AuthRoute path={Routes.ROOT} render={() => <Rentals />} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { RestfulProvider } from 'restful-react';
import { AuthProvider } from './context/AuthContext';
import { AuthRoute, Routes } from './routes';
import { Login, Register, Rentals } from './pages';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <RestfulProvider
        base={'/api'}
        onError={err => {
          if(err.status === 401 && location.pathname !== Routes.LOGIN){
            location.replace(Routes.LOGIN)
          }
        }}
      >
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} render={() => <Login />} exact />
          <Route path={Routes.REGISTER} render={() => <Register />} exact />
          <AuthRoute path={Routes.ROOT} render={() => <Rentals />} />
        </Switch>
      </Router>
      </RestfulProvider>
    </AuthProvider>
  );
};

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthRoute, Routes } from './routes';
import Typography from '@material-ui/core/Typography';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} render={() => <h1>Login Page</h1>} />
          <AuthRoute path={Routes.ROOT} render={() => <Typography variant={'h1'}>Hello World</Typography>} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

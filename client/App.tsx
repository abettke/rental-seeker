import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

export const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/login'} render={() => <h1>Login Page</h1>} />
        <Route path={'/'} render={() => <Typography variant={'h1'}>Hello World</Typography>} />
      </Switch>
    </Router>
  );
};

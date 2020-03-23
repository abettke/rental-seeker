import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/login'} render={() => <h1>Login Page</h1>} />
        <Route path={'/'} render={() => <h1>Index Route</h1>} />
      </Switch>
    </Router>
  );
};

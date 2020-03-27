import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

export const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item xs={4}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

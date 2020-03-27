import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutate } from 'restful-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AuthFormRegistration as AuthFormLogin } from '../../src/auth/auth.form.registration';
import { Auth } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { Routes } from '../routes';
import { api } from '../api';
import { Form, FormSubmit } from './Form';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import Icon from '@material-ui/core/Icon';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    '& .MuiIcon-root': {
      width: 'auto',
      height: 'auto',
    },
    '& .MuiSvgIcon-root': {
      fontSize: theme.typography.h2.fontSize,
    },
  },
  form: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
    '& button': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    '& .MuiTypography-body2': {
      textAlign: 'center',
    },
  },
  snackbar: {
    '& .MuiSnackbarContent-root': {
      backgroundColor: theme.palette.error.dark,
    },
    '& .MuiSnackbarContent-message': {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const loginForm = useForm<AuthFormLogin>();
  const { setAuth } = useAuth();
  const [authErrorFeedback, setAuthErrorFeedback] = React.useState('');
  const {
    mutate: authenticate,
    loading: authenticating,
  } = useMutate(api.auth.login);

  const login = (data: AuthFormLogin) => {
    const { from } = (location.state as any) || { from: { pathname: '/' }};
    authenticate(data).then((auth: Auth) => {
      setAuth(auth);
      history.replace(from);
    }).catch(err => {
      if(err.status === 401) {
        setAuthErrorFeedback('Invalid username / password');
      } else {
        setAuthErrorFeedback(err.message);
      }
    })
  };

  const classes = useStyles();
  return(
    <>
      <Typography variant={'h2'} className={classes.title}>
        <Icon>
          <HomeWorkIcon />
        </Icon>
        <span>Rental Seeker</span>
      </Typography>
      <Divider />
      <Form ctx={loginForm} onSubmit={login} className={classes.form}>
        <TextField
          label={'Username'}
          name={'username'}
          inputRef={loginForm.register}
          fullWidth
        />
        <TextField
          label={'Password'}
          name={'password'}
          inputRef={loginForm.register}
          type={'password'}
          fullWidth
        />
        <FormSubmit variant={'contained'} disabled={authenticating} fullWidth>
          Login
        </FormSubmit>
        <Typography variant={'body2'}>
          {'Don\'t have an account? '}
          <Link href={Routes.REGISTER}>
            {'Sign up here.'}
          </Link>
        </Typography>
      </Form>
      <Snackbar
        open={!!authErrorFeedback}
        autoHideDuration={5000}
        onClose={() => setAuthErrorFeedback('')}
        message={authErrorFeedback}
        className={classes.snackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      />
    </>
  );
};

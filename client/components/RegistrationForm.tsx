import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutate } from 'restful-react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AuthFormRegistration } from '../../src/auth/auth.form.registration';
import { Auth } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { Routes } from '../routes';
import { api } from '../api';
import { Form, FormSubmit } from './Form';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontSize: theme.typography.h3.fontSize,
    '& .MuiIcon-root': {
      width: 'auto',
      height: 'auto',
    },
    '& .MuiSvgIcon-root': {
      fontSize: theme.typography.h3.fontSize,
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

export const RegistrationForm: React.FC = () => {
  const history = useHistory();
  const loginForm = useForm<AuthFormRegistration>();
  const { setAuth } = useAuth();
  const { mutate: createUser, loading } = useMutate(api.auth.register);
  const [validationErrors, setValidationErrors] = useState({
    username: [],
    password: [],
  });

  const register = (data: AuthFormRegistration) => {
    createUser(data).then((auth: Auth) => {
      setAuth(auth);
      history.push(Routes.ROOT);
    }).catch((err) => {
      if(err.status === 400) {
        setValidationErrors({
          username: err.data.message.filter(e => e.includes('username')),
          password: err.data.message.filter(e => e.includes('password')),
        });
      }
    });
  };

  const classes = useStyles();
  return(
    <>
      <Typography variant={'h2'} className={classes.title}>
        <Icon>
          <AccountBoxSharpIcon />
        </Icon>
        <span>Create an account</span>
      </Typography>
      <Divider />
      <Form ctx={loginForm} onSubmit={register} className={classes.form}>
        <TextField
          label={'Username'}
          name={'username'}
          inputRef={loginForm.register}
          fullWidth
          error={!!validationErrors.username.length}
          helperText={validationErrors.username.join(',') || 'An email or nickname for your account'}
        />
        <TextField
          label={'Password'}
          name={'password'}
          inputRef={loginForm.register}
          type={'password'}
          fullWidth
          error={!!validationErrors.password.length}
          helperText={validationErrors.password.join(',') || 'Use a strong passphrase you can remember'}
        />
        <FormSubmit variant={'contained'} disabled={loading} fullWidth>
          Sign Up
        </FormSubmit>
        <Typography variant={'body2'}>
          {'Already have an account? '}
          <Link href={Routes.LOGIN}>
            {'Login here.'}
          </Link>
        </Typography>
      </Form>
    </>
  );
};

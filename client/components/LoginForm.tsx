import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutate } from 'restful-react';
import { AuthFormRegistration as AuthFormLogin } from '../../src/auth/auth.form.registration';
import { Auth } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { api } from '../api';
import { Form, FormSubmit } from './Form';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export const LoginForm: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const loginForm = useForm<AuthFormLogin>();
  const { setAuth } = useAuth();
  const {
    mutate: authenticate,
    loading: authenticating,
  } = useMutate(api.auth.login);

  const login = (data: AuthFormLogin) => {
    const { from } = (location.state as any) || { from: { pathname: '/' }};
    authenticate(data).then((auth: Auth) => {
      setAuth(auth);
      history.replace(from);
    });
  };

  return(
    <Grid container direction={'column'}>
      <Form ctx={loginForm} onSubmit={login}>
        <Grid item>
          <TextField
            label={'Username'}
            name={'username'}
            inputRef={loginForm.register}
          />
        </Grid>
        <Grid item>
          <TextField
            label={'Password'}
            name={'password'}
            inputRef={loginForm.register}
            type={'password'}
          />
        </Grid>
        <FormSubmit variant={'contained'} disabled={authenticating}>
          Login
        </FormSubmit>
      </Form>
    </Grid>
  );
};

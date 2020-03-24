import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormRegistration as AuthFormLogin } from '../../src/auth/auth.form.registration';
import { Form, FormSubmit } from './Form';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export const LoginForm: React.FC = () => {
  const loginForm = useForm<AuthFormLogin>();
  const login = (data: AuthFormLogin) => {
    console.log(data);
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
        <FormSubmit variant={'contained'}>
          Login
        </FormSubmit>
      </Form>
    </Grid>
  );
};

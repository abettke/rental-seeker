import React from 'react';
import { LoginForm } from '../components/LoginForm';
import Container from '@material-ui/core/Container';

export const Login: React.FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

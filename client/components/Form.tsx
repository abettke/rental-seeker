import React from 'react';
import { FormContextValues } from 'react-hook-form';
import Button, { ButtonProps } from '@material-ui/core/Button';

export interface FormProps {
  ctx: FormContextValues<any>;
  onSubmit?: (data: any) => any | Promise<any>;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ ctx, onSubmit, children }: FormProps) => {
  const { handleSubmit } = ctx;
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete={'off'}>
      {children}
    </form>
  );
};

export const FormSubmit: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Button type={'submit'} {...props}>
      {props.children || 'Submit'}
    </Button>
  );
};

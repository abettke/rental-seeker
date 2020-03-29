import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
  },
}));



export const NumberField: React.FC<TextFieldProps> = (props: TextFieldProps) => {

  const validateNumeric = (ev) => {
    if(!(/^[0-9]*$/.test(ev.key))){
      ev.preventDefault();
    }
  };

  const classes = useStyles();
  return (
    <TextField
      {...props}
      className={classes.root}
      type={'number'}
      inputProps={{
        onKeyPress: validateNumeric,
        inputMode: 'numeric',
      }}
    />
  );
};


export function getNumberValues<T>(values: Record<string, any>) {
  return Object.entries(values).reduce((acc, entry) => {
    acc[entry[0]] = entry[1] !== '' ? parseInt(entry[1]) : undefined;
    return acc;
  }, {} as T);
}

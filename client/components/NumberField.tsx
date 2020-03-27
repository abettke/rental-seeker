import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

export const NumberField: React.FC<TextFieldProps> = (props: TextFieldProps) => {

  const validateNumeric = (ev) => {
    if(!(/^[0-9]*$/.test(ev.key))){
      ev.preventDefault();
    }
  };

  return (
    <TextField
      {...props}
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

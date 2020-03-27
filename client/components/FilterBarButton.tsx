import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { NumberField } from './NumberField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rangeInputs: {
      '& .MuiTextField-root': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '& input[type=number]': {
        '-moz-appearance': 'textfield',
      },
    },
    actions: {
      justifyContent: 'space-between',
    },
  }),
);

export interface RangeFilter {
  min: number,
  max: number,
}

export const RangeFilterButton: React.FC<React.PropsWithChildren<any>> = (props: React.PropsWithChildren<any>) => {
  const { children, ...buttonProps } = props;
  const rangeFilterForm = useForm<RangeFilter>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const applyFilter = () => {
    console.log(rangeFilterForm.getValues());
    // TODO: setRentals(filters)
  };

  const classes = useStyles();
  return (
    <>
      <Button
        variant={'outlined'}
        onClick={(ev) => setAnchorEl(ev.currentTarget)}
        {...buttonProps}
      >
        {children}
      </Button>
      <Popover
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Card>
          <CardContent className={classes.rangeInputs}>
            <NumberField
              label={'Min'}
              name={'min'}
              inputRef={rangeFilterForm.register}
            />
            <NumberField
              label={'Max'}
              name={'max'}
              inputRef={rangeFilterForm.register}
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button size={'small'} onClick={() => setAnchorEl(null)}>Cancel</Button>
            <Button size={'small'} onClick={applyFilter}>Apply</Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
};

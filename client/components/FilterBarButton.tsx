import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRentals } from '../hooks/useRentals';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { NumberField, getNumberValues } from './NumberField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      '& .MuiPopover-paper': {
        marginTop: theme.spacing(1),
      },
    },
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
  min: number | undefined,
  max: number | undefined,
}

export interface RangeFilterButtonProps extends React.PropsWithChildren<any>{
  filterKey?: string;
}

export const RangeFilterButton: React.FC<RangeFilterButtonProps> = (props: RangeFilterButtonProps) => {
  const { filters, setFilters } = useRentals();
  const { children, filterKey, ...buttonProps } = props;
  const { register, getValues, errors, clearError } = useForm<RangeFilter>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const rangeConstraint = (message: string) => {
    clearError();
    const { min, max }: RangeFilter = getNumberValues<RangeFilter>(getValues());
    if(min !== undefined && max !== undefined && min > max) {
      return message;
    }
  };

  const applyFilter = () => {
    const { min, max }: RangeFilter = getNumberValues<RangeFilter>(getValues());
    const filter = JSON.parse(JSON.stringify({ '$gte': min, '$lte': max }));
    setFilters({
      ...filters,
      [filterKey ? filterKey : children.toLowerCase()]: filter,
    });
    setAnchorEl(null);
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
              inputRef={register({
                validate: () => rangeConstraint('Min should be less than or equal to Max'),
              })}
              error={!!errors.min}
              helperText={errors.min?.message || ' '}
            />
            <NumberField
              label={'Max'}
              name={'max'}
              inputRef={register({
                validate: () => rangeConstraint('Max should be greater than or equal to Min'),
              })}
              error={!!errors.max}
              helperText={errors.max?.message || ' '}
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button size={'small'} onClick={() => setAnchorEl(null)}>Cancel</Button>
            <Button size={'small'} onClick={applyFilter} disabled={!!Object.keys(errors).length}>Apply</Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
};

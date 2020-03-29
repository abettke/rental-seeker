import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useGet, useMutate, UseMutateProps } from 'restful-react';
import { useAuth } from '../hooks/useAuth';
import { Rental } from '../../src/rental/rental.entity';
import { User } from '../../src/user/user.entity';
import { Form, FormSubmit } from './Form';
import { NumberField } from './NumberField';
import { api } from '../api';
import { makeStyles, Theme} from '@material-ui/core/styles';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) => ({
  fields: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export interface RentalFormProps extends DialogProps{
  handleClose: Function;
}

export const RentalForm: React.FC<RentalFormProps> = (props: RentalFormProps) => {
  const { auth } = useAuth();
  const { handleClose, ...dialogProps } = props;
  const rentalForm = useForm({
    defaultValues: {
      available: 1,
    },
  });
  const { mutate: saveRental, loading: saving } = useMutate(api.rentals.create as UseMutateProps<any, any, any>);

  const [realtorAC, setRealtorAC] = useState(false);
  const [selectedRealtor, setSelectedRealtor] = useState(null);
  const {
    refetch: getRealtors,
    loading: fetchingRealtors,
    data: realtorRes,
    cancel: getRealtorsCancel,
  } = useGet('users', {
    lazy: true,
    queryParams: {
      s: JSON.stringify({
        username: {
          '$cont': rentalForm.getValues()['realtor'] || '',
        },
      }),
    },
    requestOptions: {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    },
  });

  const save = () => {
    console.log(rentalForm.getValues(), realtorRes.data.find(r => r.username = rentalForm.getValues()['realtor']));
  };

  const classes = useStyles();
  return (
    <Dialog
      maxWidth={'md'}
      fullWidth
      {...dialogProps}
    >
      <Form ctx={rentalForm} onSubmit={save}>
        <DialogTitle>Create Rental</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6} className={classes.fields}>
              <TextField
                label={'Name'}
                name={'name'}
                inputRef={rentalForm.register({ required: true })}
                margin={'normal'}
                fullWidth
                required
              />
              <Autocomplete
                open={realtorAC}
                onOpen={() => {
                  setRealtorAC(true);
                  getRealtors();
                }}
                onClose={() => {
                  setRealtorAC(false);
                  getRealtorsCancel();
                }}
                onInputChange={() => {
                  getRealtorsCancel();
                  getRealtors();
                }}
                onChange={(event: any, selected: User | null) => {
                  setSelectedRealtor({ id: selected.id });
                }}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.username}
                options={realtorRes?.data as User[] || []}
                loading={fetchingRealtors}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={'Realtor'}
                    name={'realtor'}
                    inputRef={rentalForm.register}
                    margin={'normal'}
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {fetchingRealtors ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name={'available'}
                control={rentalForm.control}
                as={
                  <FormControl margin={'normal'} fullWidth required>
                    <InputLabel shrink={true}>Available</InputLabel>
                    <Select
                      defaultValue={1}
                    >
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                    </Select>
                  </FormControl>
                }
              />
            </Grid>
            <Grid item xs={6} className={classes.fields}>
              <NumberField
                label={'Rooms'}
                name={'rooms'}
                inputRef={rentalForm.register({
                  required: true,
                })}
                margin={'normal'}
                fullWidth
                required
              />
              <NumberField
                label={'Size'}
                name={'size'}
                inputRef={rentalForm.register({
                  required: true,
                })}
                margin={'normal'}
                fullWidth
                required
              />
              <NumberField
                label={'Price / Month'}
                name={'pricePerMonth'}
                inputRef={rentalForm.register({
                  required: true,
                })}
                margin={'normal'}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container className={classes.fields}>
            <TextField
              label={'Description'}
              name={'description'}
              inputRef={rentalForm.register({ required: true })}
              margin={'normal'}
              multiline
              rows={4}
              rowsMax={4}
              fullWidth
              required
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <FormSubmit disabled={saving}>
            Save
          </FormSubmit>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

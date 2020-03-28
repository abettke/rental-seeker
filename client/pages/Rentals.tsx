import React, { useState } from 'react';
import { useGet } from 'restful-react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../api';
import { TopBar } from '../components/TopBar';
import { FilterBar } from '../components/FilterBar';
import { RentalsList } from '../components/RentalsList';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  listView: {
    overflow: 'auto',
    height: '100%',
  },
});

export const Rentals: React.FC = () => {
  const { auth } = useAuth();
  const { data: res, loading, error } = useGet({
    ...api.rentals.list,
    requestOptions: {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
      },
    },
  });

  const classes = useStyles();
  return (
    <>
      <header>
        <TopBar />
        <FilterBar />
      </header>
      <Grid
        container
        component={'main'}
        className={classes.root}
        >
        <Grid item xs={5} className={classes.listView}>
          <RentalsList rentals={res?.data}/>
        </Grid>
        <Grid item xs>Map View</Grid>
      </Grid>
    </>
  )
};

import React from 'react';
import { RentalsProvider } from '../context/RentalsContext';
import { TopBar } from '../components/TopBar';
import { FilterBar } from '../components/FilterBar';
import { RentalsList } from '../components/RentalsList';
import { RentalsMap } from '../components/RentalsMap';
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
  const classes = useStyles();
  return (
    <RentalsProvider>
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
          <RentalsList />
        </Grid>
        <Grid item xs>
          <RentalsMap />
        </Grid>
      </Grid>
    </RentalsProvider>
  )
};

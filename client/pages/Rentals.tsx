import React, { useState } from 'react';
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
  const [isMapOpen, setIsMapOpen] = useState(true);

  const classes = useStyles();
  return (
    <RentalsProvider>
      <header>
        <TopBar />
        <FilterBar showMap={isMapOpen} setShowMap={setIsMapOpen} />
      </header>
      <Grid
        container
        component={'main'}
        className={classes.root}
        >
        <Grid item xs={isMapOpen ? 5 : 12} className={classes.listView}>
          <RentalsList />
        </Grid>
        {isMapOpen &&
          <Grid item xs>
            <RentalsMap />
          </Grid>
        }
      </Grid>
    </RentalsProvider>
  )
};

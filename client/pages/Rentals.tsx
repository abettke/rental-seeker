import React from 'react';
import { TopBar } from '../components/TopBar';
import { FilterBar } from '../components/FilterBar';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const Rentals: React.FC = () => {
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
        <Grid item xs={5}>List View</Grid>
        <Grid item xs>Map View</Grid>
      </Grid>
    </>
  )
};

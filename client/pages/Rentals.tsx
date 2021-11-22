import React, { useState } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { RentalsProvider } from '../context/RentalsContext';
import { TopBar } from '../components/TopBar';
import { FilterBar } from '../components/FilterBar';
import { RentalsList } from '../components/RentalsList';
import { RentalsMap } from '../components/RentalsMap';
import { RentalForm } from '../components/RentalForm';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  listView: {
    overflow: 'auto',
    height: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(2),
    zIndex: 800,
  },
}));

export const Rentals: React.FC = () => {
  const { role } = useCurrentUser();
  const [isMapOpen, setIsMapOpen] = useState(true);
  const [isRentalFormOpen, setIsRentalFormOpen] = useState(false);

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
        <Grid item xs={isMapOpen ? 4 : 12} className={classes.listView}>
          <RentalsList compact={isMapOpen} />
        </Grid>
        {isMapOpen &&
          <Grid item xs>
            <RentalsMap />
          </Grid>
        }
      </Grid>
      <RentalForm
        open={isRentalFormOpen}
        onClose={() => setIsRentalFormOpen(false)}
        handleClose={setIsRentalFormOpen}
      />
      {role < 2 ?
        <Fab
          onClick={() => setIsRentalFormOpen(true)}
          className={classes.fab}
          color={'primary'}
        >
          <Add />
        </Fab> : null
      }
    </RentalsProvider>
  )
};

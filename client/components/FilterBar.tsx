import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

import { RangeFilterButton } from './FilterBarButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filters: {
      '& .MuiButton-root': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
    switch: {
      display: 'flex',
      alignItems: 'center',
      '& .MuiTypography-caption': {
        whiteSpace: 'nowrap',
      },
    },
  }),
);

export const FilterBar: React.FC = () => {

  const classes = useStyles();
  return (
    <AppBar position={'static'} color={'inherit'} elevation={2}>
      <Toolbar>
        <Grid container spacing={4} className={classes.filters}>
          <RangeFilterButton>{'Rooms'}</RangeFilterButton>
          <RangeFilterButton>{'Size'}</RangeFilterButton>
          <RangeFilterButton>{'Price'}</RangeFilterButton>
        </Grid>
        <div className={classes.switch}>
          <Typography variant={'caption'}>Show Map</Typography>
          <Switch />
        </div>
      </Toolbar>
    </AppBar>
  );
};

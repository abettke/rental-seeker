import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(() =>
  createStyles({
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
    <AppBar position={'static'} color={'default'} elevation={0}>
      <Toolbar>
        <Grid container>
          <Button>Filter 1</Button>
          <Button>Filter 2</Button>
          <Button>Filter 3</Button>
        </Grid>
        <div className={classes.switch}>
          <Typography variant={'caption'}>Show Map</Typography>
          <Switch />
        </div>
      </Toolbar>
    </AppBar>
  );
};

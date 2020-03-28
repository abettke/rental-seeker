import React from 'react';
import { Rental } from '../../src/rental/rental.entity';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(1),
  },
  price: {
    marginRight: theme.spacing(.5),
  },
}));

export interface RentalsListProps {
  rentals: Rental[];
}

export const RentalsList: React.FC<RentalsListProps> = (props: RentalsListProps) => {
  const { rentals } = props;
  console.log(rentals);

  const classes = useStyles();
  return (
    <>
      {rentals?.map((rental: Rental) =>
        <Card key={rental.id} elevation={0} className={classes.card}>
          <CardHeader
            title={rental.name}
            titleTypographyProps={{
              variant: 'body1',
            }}
            subheader={`${rental.rooms} ${rental.rooms > 1 ? 'Bedrooms' : 'Bedroom'} ∙ ${rental.size} sq ft`}
          />
          <CardContent>
            <Typography variant={'body2'}>
              {rental.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid
              container
              alignItems={'center'}
              justify={'flex-end'}
            >
              <Typography variant={'h5'} className={classes.price}>{rental.pricePerMonth} </Typography>
              <Typography variant={'caption'}>/ month</Typography>
            </Grid>
          </CardActions>
        </Card>
      )}
    </>
  )
};

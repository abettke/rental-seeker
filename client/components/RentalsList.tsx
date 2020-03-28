import React from 'react';
import { Rental } from '../../src/rental/rental.entity';
import { useRentals } from '../hooks/useRentals';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  price: {
    marginRight: theme.spacing(.5),
  },
}));

export const RentalsList: React.FC = () => {
  const { rentals } = useRentals();
  const media = { width: 1600, height: 900 };
  const mediaCategory = 'housing';
  const mediaUrl = `https://source.unsplash.com/${media.width}x${media.height}/?${mediaCategory}`;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {rentals?.map((rental: Rental) => (
        <Card key={rental.id} className={classes.card}>
          <CardMedia
            className={classes.media}
            title={`${rental.name} Thumbnail`}
            image={`${mediaUrl}&sig=${rental.id}`}
          />
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
              <Typography variant={'h5'} className={classes.price}>${rental.pricePerMonth}</Typography>
              <Typography variant={'caption'}>/ month</Typography>
            </Grid>
          </CardActions>
        </Card>
      ))}
    </div>
  )
};

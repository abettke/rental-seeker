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
import Icon from '@material-ui/core/Icon';
import Lens from '@material-ui/icons/Lens';
import LensOutlined from '@material-ui/icons/LensOutlined'

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
  actions: {
    margin: theme.spacing(1),
  },
  availability: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiIcon-root': {
      width: 'auto',
      height: 'auto',
      marginLeft: theme.spacing(.5),
    },
    '& .MuiSvgIcon-root': {
      fontSize: '.75rem',
    },
  },
  price: {
    display: 'inline',
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
          <CardActions className={classes.actions}>
            <Grid
              container
              alignItems={'center'}
              justify={'space-between'}
            >
              <Grid item className={classes.availability}>
                <Typography variant={'caption'}>
                  {rental.available ? 'Available' : 'Unavailable'}
                </Typography>
                <Icon>
                  {rental.available ?
                    <Lens style={{ color: 'green' }} /> :
                    <LensOutlined />
                  }
                </Icon>
              </Grid>
              <Grid item>
                <Typography variant={'h5'} className={classes.price}>${rental.pricePerMonth}</Typography>
                <Typography variant={'caption'}>/ month</Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      ))}
    </div>
  )
};

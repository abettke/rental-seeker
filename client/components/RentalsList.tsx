import React from 'react';
import { useMutate, UseMutateProps } from 'restful-react';
import { Rental } from '../../src/rental/rental.entity';
import { useRentals } from '../hooks/useRentals';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { api } from '../api';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Lens from '@material-ui/icons/Lens';
import LensOutlined from '@material-ui/icons/LensOutlined'
import Delete from '@material-ui/icons/Delete'
import { useAuth } from '../hooks/useAuth';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
  },
  cardFull: {
    display: 'flex',
  },
  mediaFull: {
    height: 400,
    paddingLeft: '56.25%', // 16:9
  },
  mediaCompact: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  },
  availabilityIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: '.75rem',
    },
  },
  price: {
    display: 'inline',
    marginRight: theme.spacing(.5),
  },
}));

export interface RentalsListProps {
  compact?: boolean;
}

export const RentalsList: React.FC<RentalsListProps> = (props: RentalsListProps) => {
  const { auth } = useAuth();
  const { role } = useCurrentUser();
  const { rentals, refetchRentals } = useRentals();
  const { compact } = props;
  const media = { width: 1600, height: 900 };
  const mediaCategory = 'housing';
  const mediaUrl = `https://source.unsplash.com/${media.width}x${media.height}/?${mediaCategory}`;
  const classes = useStyles();

  const { mutate: deleteRentals } = useMutate({
    ...(api.rentals.delete as UseMutateProps<any, any, any>),
    requestOptions: {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
      },
    },
  });

  return (
    <div className={classes.root}>
      {rentals?.map((rental: Rental) => (
        <Card key={rental.id} className={`${classes.card} ${!compact ? classes.cardFull : ''}`.trim()}>
          <CardMedia
            className={compact ? classes.mediaCompact : classes.mediaFull}
            title={`${rental.name} Thumbnail`}
            image={`${mediaUrl}&sig=${rental.id}`}
          />
          <div className={classes.content}>
            <div>
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
            </div>
            <CardActions className={classes.actions}>
              <Grid
                container
                alignItems={'center'}
                justify={role < 2 ? 'space-between' : 'flex-end'}
              >
                {role < 2 ?
                  <Grid item className={classes.availability}>
                    <Typography variant={'caption'}>
                      {rental.available ? 'Available' : 'Unavailable'}
                    </Typography>
                    <Icon className={classes.availabilityIcon}>
                      {rental.available ?
                        <Lens style={{ color: 'green' }} /> :
                        <LensOutlined />
                      }
                    </Icon>
                    <IconButton onClick={() => {
                      deleteRentals(rental.id).then(() => refetchRentals());
                    }}>
                      <Delete />
                    </IconButton>
                  </Grid> : null
                }
                <Grid item>
                  <Typography variant={'h5'} className={classes.price}>${rental.pricePerMonth}</Typography>
                  <Typography variant={'caption'}>/ month</Typography>
                </Grid>
              </Grid>
            </CardActions>
          </div>
        </Card>
      ))}
    </div>
  )
};

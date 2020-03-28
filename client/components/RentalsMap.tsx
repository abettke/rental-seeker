import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useRentals } from '../hooks/useRentals';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Lens from '@material-ui/icons/Lens';
import LensOutlined from '@material-ui/icons/LensOutlined';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  availability: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiIcon-root': {
      width: 'auto',
      height: 'auto',
      marginLeft: theme.spacing(.5),
      fontSize: 'initial',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '.75rem',
    },
  },
}));

export const RentalsMap: React.FC = () => {
  const { role } = useCurrentUser();
  const { rentals } = useRentals();
  const center = [32.790882, -79.942017]; // Charleston, SC
  const zoom = 13;
  const classes = useStyles();

  return (
    <Map center={center} zoom={zoom} className={classes.root}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {rentals && rentals.map(rental =>
        <Marker key={rental.id} position={rental.location.split(',')}>
          <Popup>
            <Typography variant={'h6'}>{rental.name}</Typography>
            <Divider />
            <Typography variant={'body2'}>
              {`${rental.rooms} ${rental.rooms > 1 ? 'Bedrooms' : 'Bedroom'} ∙ ${rental.size} sq ft`}
            </Typography>
            <Typography variant={'body2'}>
              {rental.description}
            </Typography>
            <Typography variant={'subtitle1'}><strong>${rental.pricePerMonth}</strong> / month</Typography>
            {role < 2 ?
              <div className={classes.availability}>
                <Typography variant={'caption'}>
                  {rental.available ? 'Available' : 'Unavailable'}
                </Typography>
                <Icon>
                  {rental.available ?
                    <Lens style={{ color: 'green' }} /> :
                    <LensOutlined />
                  }
                </Icon>
              </div> : null
            }
          </Popup>
        </Marker>
      )}
    </Map>
  )
};

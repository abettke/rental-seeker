import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { Rental } from '../../src/rental/rental.entity';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

export interface RentalsMapProps {
  rentals: Rental[];
}

export const RentalsMap: React.FC<RentalsMapProps> = (props: RentalsMapProps) => {
  const center = [32.790882, -79.942017]; // Charleston, SC
  const zoom = 13;
  const classes = useStyles();
  const { rentals } = props;

  return (
    <Map center={center} zoom={zoom} className={classes.root}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {rentals && rentals.map(rental =>
        <Marker key={rental.id} position={rental.location.split(',')}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </Map>
  )
};

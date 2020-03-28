import React from 'react';
import { Rental } from '../../src/rental/rental.entity';

export interface RentalsListProps {
  rentals: Rental[];
}

export const RentalsList: React.FC<RentalsListProps> = (props: RentalsListProps) => {
  const { rentals } = props;
  console.log(rentals);
  return (
    <h2>Hello</h2>
  )
};

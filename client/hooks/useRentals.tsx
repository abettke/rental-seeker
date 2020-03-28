import { useContext } from 'react';
import { RentalsContext, RentalsContextInterface } from '../context/RentalsContext';

export const useRentals = (): RentalsContextInterface => {
  return useContext(RentalsContext);
};

import React from 'react';
import { Rental } from '../../src/rental/rental.entity';
import { useGet } from 'restful-react';
import { api } from '../api';
import { useAuth } from '../hooks/useAuth';

export class RentalsContextInterface {
  loading: boolean;
  rentals: Rental[];
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
}

export const RentalsContext = React.createContext<RentalsContextInterface>({
  loading: false,
  rentals: [],
  filters: {},
  setFilters: () => null,
});

export const RentalsProvider: React.FC = (props: React.ComponentProps<any>) => {
  const { auth } = useAuth();
  const [filters, setFilters] = React.useState<Record<string, any>>({});
  const { loading, data: res } = useGet({
    ...api.rentals.list,
    queryParams: {
      s: JSON.stringify(filters),
    },
    requestOptions: {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
      },
    },
  });

  return(
    <RentalsContext.Provider
      value={{
        loading,
        rentals: res ? res.data : [],
        filters,
        setFilters,
      }}
    >
      {props.children}
    </RentalsContext.Provider>
  )
};

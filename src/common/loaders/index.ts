import { Sequelize } from 'sequelize-typescript';
import { createAirportLoader } from './airport.loader';
import { createFlightLoader } from './flight.loader';
import { createBookingLoader } from './booking.loader';
import { createPassenegerLoader } from './passenger.loader';

export const createLoaders = (sequelize: Sequelize) => ({
  airport: createAirportLoader(sequelize),
  flight: createFlightLoader(sequelize),
  booking: createBookingLoader(sequelize),
  passenger: createPassenegerLoader(sequelize),
});

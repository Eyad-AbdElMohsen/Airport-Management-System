import { BadRequestException, Injectable } from '@nestjs/common';
import { FlightRepo } from './flight.repository';
import { CreateFlightInput } from './gql/create.input';
import { FlightQueryInput } from './gql/query.input';

@Injectable()
export class FlightService {
  constructor(private readonly flightRepo: FlightRepo) {}

  async createFlight(createFlightInput: CreateFlightInput) {
    const { arrivalTime, departureTime, destinationId, departureId, fromCountry, toCountry } =
      createFlightInput;
    if (arrivalTime <= departureTime) {
      throw new BadRequestException(
        'Validation Error: Arrival time must be after departure time',
      );
    }
    if (departureId === destinationId) {
      throw new BadRequestException(
        'Validation Error: Departure and destination cannot be the same airport',
      );
    }
    if (fromCountry === toCountry) {
      throw new BadRequestException(
        'Validation Error: Departure and destination cannot be the same country',
      );
    }

    return (await this.flightRepo.create(createFlightInput)).dataValues;
  }

  async getFlightById(id: number) {
    return await this.flightRepo.getById(id);
  }

  async getAllFlights(options: FlightQueryInput) {
    return await this.flightRepo.getAll(options);
  }
}

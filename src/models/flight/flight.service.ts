import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FlightRepo } from './flight.repository';
import { CreateFlightInput } from './gql/create.input';
import { FlightQueryInput } from './gql/query.input';
import { BookingRepo } from '../booking/booking.repository';
import { SeatModel } from '../seat/seat.entity';
import { UpdateFlightStatusInput } from './gql/update.input';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class FlightService {
  constructor(
    private readonly flightRepo: FlightRepo,
    private readonly bookingRepo: BookingRepo,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  async createFlight(createFlightInput: CreateFlightInput) {
    const {
      arrivalTime,
      departureTime,
      destinationId,
      departureId,
      fromCountry,
      toCountry,
    } = createFlightInput;
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

  async getAllAvailableSeatsInFlight(flightId: number) {
    const allSeats = (
      await this.flightRepo.getSeatsById(flightId)
    )?.dataValues?.plane?.dataValues?.seats?.map(
      (seat: SeatModel) => seat.dataValues,
    );

    const unAvailableSeats = (
      await this.bookingRepo.getBookedSeatsByFlightId(flightId)
    ).map((booking) => booking.dataValues.seat.dataValues);

    if (!allSeats || !unAvailableSeats)
      throw new NotFoundException('No Flight Found');

    const availableSeats = allSeats.filter(
      (seat: SeatModel) => !unAvailableSeats.includes(seat.id),
    );

    return availableSeats;
  }

  async updateFlightStatus(updateFlightStatusInput: UpdateFlightStatusInput) {
    const [count, row] = await this.flightRepo.update(updateFlightStatusInput);
    if (!count)
      throw new HttpException(
        'No thing updated',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const updatedData = row[0].dataValues;
    const bookings = (
      await this.bookingRepo.getAllByFlightId(
        updateFlightStatusInput.id,
      )
    ).map((booking) => booking.dataValues);

    for (const booking of bookings) {
      this.pubSub.publish('flightStatusUpdated', {
        flightStatusUpdated: updatedData,
        flightId: updatedData.id,
        passengerId: booking.passengerId,
      });
    }

    return updatedData
  }
}

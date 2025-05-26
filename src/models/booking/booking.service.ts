import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingRepo } from './booking.repository';
import { CreateBookingInput } from './gql/create.input';
import { FlightRepo } from '../flight/flight.repository';
import { SeatRepo } from '../seat/seat.repository';
import { PassengerRepo } from '../passenger/passenger.repository';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepo: BookingRepo,
    private readonly seatRepo: SeatRepo,
    private flightRepo: FlightRepo,
    private passengerRepo: PassengerRepo,
  ) {}

  async createBooking(authId: number, createBookingInput: CreateBookingInput) {
    const passenger = await this.passengerRepo.getByAuthId(authId);
    if (!passenger) {
      throw new BadRequestException(
        'You must complete your passenger profile before booking a flight.',
      );
    }

    const { flightId, seatId } = createBookingInput;
    const passengerId = passenger.id

    const isSeatNotAvailable = await this.bookingRepo.getSeatInSpecificFlight(
      seatId,
      flightId,
    );
    if (isSeatNotAvailable) {
      throw new BadRequestException('This seat is already booked!');
    }
    const isPassengerNotAvailable =
      await this.bookingRepo.getPassengerInSpecificFlight(
        passengerId,
        flightId,
      );
    if (isPassengerNotAvailable) {
      throw new BadRequestException(
        'This passenger already booked a ticket in this flight!',
      );
    }

    const seat = await this.seatRepo.getById(seatId);
    const flight = await this.flightRepo.getById(flightId);

    if (seat!.planeId != flight!.planeId) {
      throw new BadRequestException(
        'This seat is not for that flight, It is for another Plane!',
      );
    }

    return (await this.bookingRepo.create(createBookingInput, passengerId)).dataValues;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingRepo } from './booking.repository';
import { CreateBookingInput } from './gql/create.input';
import { FlightRepo } from '../flight/flight.repository';
import { SeatRepo } from '../seat/seat.repository';
import { PassengerRepo } from '../passenger/passenger.repository';
import { BookingQueryInput } from './gql/query.input';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepo: BookingRepo,
    private readonly seatRepo: SeatRepo,
    private flightRepo: FlightRepo,
    private passengerRepo: PassengerRepo,
  ) {}

  async createBooking(authId: number, createBookingInput: CreateBookingInput) {
    // Worst method about Performance :)
    const passenger = await this.passengerRepo.getByAuthId(authId);
    if (!passenger) {
      throw new BadRequestException(
        'You must complete your passenger profile before booking a flight.',
      );
    }

    const { flightId, seatId } = createBookingInput;
    const passengerId = passenger.id;

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

    return (await this.bookingRepo.create(createBookingInput, passengerId))
      .dataValues;
  }

  async getAllBookingForFlight(flightId: number, options: BookingQueryInput) {
    const isFlightExist = await this.flightRepo.getById(flightId);
    if (!isFlightExist) throw new NotFoundException('No Flight Found!');
    return await this.bookingRepo.getAllByFlightId(flightId, options);
  }

  async checkPassengerBooking(flightId: number, passengerId: number) {
    const passenger = await this.bookingRepo.getPassengerInSpecificFlight(
      passengerId,
      flightId,
    );
    if (!passenger) {
      throw new NotFoundException('No Booking for this passenger');
    }
    return passenger;
  }

  async deleteBooking(flightId: number, passengerId: number) {
    const res = await this.bookingRepo.delete(flightId, passengerId);
    if (!res) throw new NotFoundException('No Booking Found');
    return { message: 'Booking Deleted Successfully!' };
  }
}

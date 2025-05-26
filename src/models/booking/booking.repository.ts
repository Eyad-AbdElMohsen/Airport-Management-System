import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookingModel } from './booking.entity';
import { CreateBookingInput } from './gql/create.input';

@Injectable()
export class BookingRepo {
  constructor(
    @InjectModel(BookingModel)
    private bookingModel: typeof BookingModel,
  ) {}

  async create(createBookingInput: CreateBookingInput, passengerId: number) {
    return await this.bookingModel.create({ ...createBookingInput, passengerId });
  }

  async getPassengerInSpecificFlight(passengerId: number, flightId: number) {
    return await this.bookingModel.findOne({
      where: {
        passengerId,
        flightId,
      },
    });
  }

  async getSeatInSpecificFlight(seatId: number, flightId: number) {
    return await this.bookingModel.findOne({
      where: {
        seatId,
        flightId,
      },
    });
  }
}

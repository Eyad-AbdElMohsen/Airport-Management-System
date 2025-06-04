import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookingModel } from './booking.entity';
import { CreateBookingInput } from './gql/create.input';
import { FindOptions } from 'sequelize';
import { SeatModel } from '../seat/seat.entity';

@Injectable()
export class BookingRepo {
  constructor(
    @InjectModel(BookingModel)
    private bookingModel: typeof BookingModel,
  ) {}

  async create(createBookingInput: CreateBookingInput, passengerId: number) {
    return await this.bookingModel.create({
      ...createBookingInput,
      passengerId,
    });
  }

  async getAllByFlightId(flightId: number, options: FindOptions) {
    options.raw = true;
    return await this.bookingModel.findAll({
      where: {
        flightId,
      },
      ...options,
    });
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

  async delete(flightId: number, passengerId: number) {
    return await this.bookingModel.destroy({
      where: { flightId, passengerId },
    });
  }

  async getBookedSeatsByFlightId(flightId: number){
     return await this.bookingModel.findAll({
      where: {
        flightId,
      },
      include: {
        model: SeatModel,
        attributes: ['id', 'seatCode'],
      }
    });
  }
}

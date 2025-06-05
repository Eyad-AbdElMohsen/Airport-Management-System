import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWT } from 'src/common/utils/jwt';
import { BookingModel } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingRepo } from './booking.repository';
import { BookingResolver } from './booking.resolver';
import { SeatModule } from '../seat/seat.module';
import { FlightModule } from '../flight/flight.module';
import { PassengerModule } from '../passenger/passenger.module';

@Module({
  imports: [
    SequelizeModule.forFeature([BookingModel]),
    forwardRef(() => FlightModule),
    SeatModule,
    PassengerModule,
  ],
  providers: [BookingResolver, BookingService, BookingRepo, JWT],
  exports: [BookingRepo, BookingService],
})
export class BookingModule {}

import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWT } from 'src/common/utils/jwt';
import { FlightModel } from './flight.entity';
import { FlightResolver } from './flight.resolver';
import { FlightService } from './flight.service';
import { FlightRepo } from './flight.repository';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    SequelizeModule.forFeature([FlightModel]),
    forwardRef(() => BookingModule),
  ],
  providers: [FlightResolver, FlightService, FlightRepo, JWT],
  exports: [FlightRepo],
})
export class FlightModule {}

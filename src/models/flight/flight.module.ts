import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWT } from 'src/common/utils/jwt';
import { FlightModel } from './flight.entity';
import { FlightResolver } from './flight.resolver';
import { FlightService } from './flight.service';
import { FlightRepo } from './flight.repository';
import { BookingModule } from '../booking/booking.module';
import { SharedModule } from 'src/common/shared/shared.module';
import { PassengerModule } from '../passenger/passenger.module';
import { MailModule } from 'src/common/mail/mail.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([FlightModel]),
    forwardRef(() => BookingModule),
    SharedModule,
    PassengerModule,
    MailModule,
    AuthModule,
  ],
  providers: [FlightResolver, FlightService, FlightRepo, JWT],
  exports: [FlightRepo],
})
export class FlightModule {}

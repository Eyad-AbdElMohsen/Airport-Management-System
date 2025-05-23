import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWT } from 'src/common/utils/jwt';
import { FlightModel } from './flight.entity';
import { FlightResolver } from './flight.resolver';
import { FlightService } from './flight.service';
import { FlightRepo } from './flight.repository';

@Module({
  imports: [SequelizeModule.forFeature([FlightModel])],
  providers: [FlightResolver, FlightService, FlightRepo, JWT],
})
export class FlightModule {}

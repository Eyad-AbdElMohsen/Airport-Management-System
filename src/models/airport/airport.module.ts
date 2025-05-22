import { Module } from '@nestjs/common';
import { AirportModel } from './airport.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AirportRepo } from './airport.repository';
import { AirportResolver } from './airport.resolver';
import { AirportService } from './airport.service';
import { JWT } from 'src/common/utils/jwt';

@Module({
  imports: [SequelizeModule.forFeature([AirportModel])],
  providers: [AirportRepo, AirportResolver, AirportService, JWT],
})
export class AirportModule {}

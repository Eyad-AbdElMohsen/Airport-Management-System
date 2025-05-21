import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassengerModel } from './passenger.entity';
import { PassengerRepo } from './passenger.repository';
import { PassengerResolver } from './passenger.resolver';
import { PassengerService } from './passenger.service';
import { JWT } from 'src/common/utils/jwt';

@Module({
  imports: [SequelizeModule.forFeature([PassengerModel])],
  providers: [PassengerRepo, PassengerResolver, PassengerService, JWT],
})
export class PassengerModule {}

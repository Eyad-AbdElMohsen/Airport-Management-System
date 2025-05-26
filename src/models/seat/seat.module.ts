import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeatModel } from './seat.entity';
import { SeatRepo } from './seat.repository';

@Module({
  imports: [SequelizeModule.forFeature([SeatModel])],
  providers: [SeatRepo],
  exports: [SeatRepo]
})
export class SeatModule {}

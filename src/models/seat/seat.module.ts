import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeatModel } from './seat.entity';

@Module({
  imports: [SequelizeModule.forFeature([SeatModel])],
})
export class SeatModule {}

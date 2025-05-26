import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWT } from 'src/common/utils/jwt';
import { FlightAssignmentModel } from './flightAssignment.entity';
import { FlightAssignmentRepo } from './flightAssignment.repository';
import { FlightAssignmentService } from './flightAssignment.service';
import { FlightAssignmentResolver } from './flightAssignment.resolver';

@Module({
  imports: [SequelizeModule.forFeature([FlightAssignmentModel])],
  providers: [
    FlightAssignmentResolver,
    FlightAssignmentService,
    FlightAssignmentRepo,
    JWT,
  ],
})
export class FlightAssignmentModule {}

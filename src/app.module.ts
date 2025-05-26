import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './config/db.config';
import { APP_FILTER } from '@nestjs/core';
import { GeneralGqlExceptionFilter } from './common/filters/gql.filter';
import { GraphQLModule } from '@nestjs/graphql';
import { gqlConfig } from './config/gql.config';
import { AuthModule } from './models/auth/auth.module';
import { PassengerModule } from './models/passenger/passenger.module';
import { AirportModule } from './models/airport/airport.module';
import { StaffModule } from './models/staff/staff.module';
import { PlaneModule } from './models/plane/plane.module';
import { FlightModule } from './models/flight/flight.module';
import { SeatModule } from './models/seat/seat.module';
import { FlightAssignmentModule } from './models/flightAssignment/flightAssignment.module';
import { BagModule } from './models/bag/bag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(gqlConfig),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      ...dbConfig,
    }),
    AuthModule,
    PassengerModule,
    AirportModule,
    StaffModule,
    PlaneModule,
    FlightModule,
    SeatModule,
    FlightAssignmentModule,
    BagModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GeneralGqlExceptionFilter,
    },
  ],
})
export class AppModule {}

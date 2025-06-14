import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/db.config';
import { APP_FILTER } from '@nestjs/core';
import { GeneralGqlExceptionFilter } from './common/filters/gql-exception.filter';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './models/auth/auth.module';
import { PassengerModule } from './models/passenger/passenger.module';
import { AirportModule } from './models/airport/airport.module';
import { StaffModule } from './models/staff/staff.module';
import { PlaneModule } from './models/plane/plane.module';
import { FlightModule } from './models/flight/flight.module';
import { SeatModule } from './models/seat/seat.module';
import { FlightAssignmentModule } from './models/flightAssignment/flightAssignment.module';
import { BagModule } from './models/bag/bag.module';
import { BookingModule } from './models/booking/booking.module';
import { Sequelize } from 'sequelize-typescript';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './config/gql.config';
import { JWT } from './common/utils/jwt';
import { GqlConfigModule } from './config/gql.module';
import { MailModule } from './common/mail/mail.module';
import { BullQueueModule } from './common/queue/queue.module';
import * as crypto from 'crypto';
(global as any).crypto = crypto;
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [SequelizeModule, ConfigModule, GqlConfigModule],
      inject: [GqlConfigService, Sequelize],
      useFactory: async (
        gqlConfigService: GqlConfigService,
        sequelize: Sequelize,
      ) => gqlConfigService.createGqlConfig(sequelize),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      ...dbConfig,
    }),
    BullQueueModule,
    MailModule,
    GqlConfigModule,
    AuthModule,
    PassengerModule,
    AirportModule,
    StaffModule,
    PlaneModule,
    FlightModule,
    SeatModule,
    FlightAssignmentModule,
    BagModule,
    BookingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GeneralGqlExceptionFilter,
    },
    GqlConfigService,
    JWT,
  ],
})
export class AppModule {}

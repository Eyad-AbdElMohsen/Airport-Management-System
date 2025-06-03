import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingModel } from './booking.entity';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { BookingService } from './booking.service';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { Booking } from './gql/booking.object';
import { CreateBookingInput } from './gql/create.input';
import { GqlContext } from 'src/common/types/context.type';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';
import { BookingQueryInput } from './gql/query.input';
import { GraphQLJSONObject } from 'graphql-type-json';

@Resolver(() => BookingModel)
@UseGuards(AuthGuard)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Roles(AuthRoles.passenger)
  @Mutation(() => Booking)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
    @Context() context: GqlContext,
  ) {
    const authId = context.user!.id;
    return await this.bookingService.createBooking(authId, createBookingInput);
  }

  @Query(() => [Booking])
  async getAllBookingForFlight(
    @Args('query', ApiFeaturesPipe) options: BookingQueryInput,
    @Args('flightId', ParseIntPipe) flightId: number,
  ) {
    return await this.bookingService.getAllBookingForFlight(flightId, options);
  }

  @Roles(AuthRoles.admin)
  @Mutation(() => GraphQLJSONObject)
  async deleteBooking(
    @Args('flightId', ParseIntPipe) flightId: number,
    @Args('passengerId', ParseIntPipe) passengerId: number,
  ) {
    return await this.bookingService.deleteBooking(flightId, passengerId);
  }
}

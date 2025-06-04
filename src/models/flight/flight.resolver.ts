import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FlightService } from './flight.service';
import { Flight } from './gql/flight.object';
import { CreateFlightInput } from './gql/create.input';
import { FlightQueryInput } from './gql/query.input';
import { Bag } from '../bag/gql/bag.object';
import { GqlContext } from 'src/common/types/context.type';
import { Booking } from '../booking/gql/booking.object';
import { Seat } from '../seat/gql/seat.object';

@UseGuards(AuthGuard)
@Resolver(() => Flight)
export class FlightResolver {
  constructor(private readonly flightService: FlightService) {}

  @Mutation(() => Flight)
  @Roles(AuthRoles.admin)
  async createFlight(
    @Args('createFlightInput') createFlightInput: CreateFlightInput,
  ) {
    return await this.flightService.createFlight(createFlightInput);
  }

  @Query(() => Flight)
  async getFlight(@Args('flightId', ParseIntPipe) flightId: number) {
    return await this.flightService.getFlightById(flightId);
  }

  @Query(() => [Flight])
  async getAllFlights(
    @Args('query', ApiFeaturesPipe) options: FlightQueryInput,
  ) {
    return await this.flightService.getAllFlights(options);
  }

  @Query(() => [Seat])
  async getAllAvailableSeatsInFlight(
    @Args('flightId', ParseIntPipe) flightId: number,
  ) {
    return await this.flightService.getAllAvailableSeatsInFlight(flightId)
  }

  @ResolveField(() => [Bag])
  async bag(@Parent() flight: Flight, @Context() { loaders }: GqlContext) {
    return loaders.flight.bagLoader.load(flight.id);
  }

  @ResolveField(() => [Booking])
  async booking(@Parent() flight: Flight, @Context() { loaders }: GqlContext) {
    return loaders.flight.bookingLoader.load(flight.id);
  }
}

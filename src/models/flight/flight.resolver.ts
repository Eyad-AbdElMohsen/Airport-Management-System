import { Inject, ParseIntPipe, UseGuards } from '@nestjs/common';
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
  Subscription,
} from '@nestjs/graphql';
import { FlightService } from './flight.service';
import { Flight } from './gql/flight.object';
import { CreateFlightInput } from './gql/create.input';
import { FlightQueryInput } from './gql/query.input';
import { Bag } from '../bag/gql/bag.object';
import { GqlContext } from 'src/common/types/context.type';
import { Booking } from '../booking/gql/booking.object';
import { Seat } from '../seat/gql/seat.object';
import { UpdateFlightStatusInput } from './gql/update.input';
import { PubSub } from 'graphql-subscriptions';
import { JwtPayload } from 'src/common/types/JwtPayload';
import { PassengerService } from '../passenger/passenger.service';
import { BookingService } from '../booking/booking.service';

@Resolver(() => Flight)
export class FlightResolver {
  constructor(
    private readonly flightService: FlightService,
    @Inject('PUB_SUB') private pubSub: PubSub,
    // private readonly passengerService: PassengerService,
    // private readonly bookingServiec: BookingService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Flight)
  @Roles(AuthRoles.admin)
  async createFlight(
    @Args('createFlightInput') createFlightInput: CreateFlightInput,
  ) {
    return await this.flightService.createFlight(createFlightInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => Flight)
  async getFlight(@Args('flightId', ParseIntPipe) flightId: number) {
    return await this.flightService.getFlightById(flightId);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Flight])
  async getAllFlights(
    @Args('query', ApiFeaturesPipe) options: FlightQueryInput,
  ) {
    return await this.flightService.getAllFlights(options);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Seat])
  async getAllAvailableSeatsInFlight(
    @Args('flightId', ParseIntPipe) flightId: number,
  ) {
    return await this.flightService.getAllAvailableSeatsInFlight(flightId);
  }

  @UseGuards(AuthGuard)
  @ResolveField(() => [Bag])
  async bag(@Parent() flight: Flight, @Context() { loaders }: GqlContext) {
    return loaders.flight.bagLoader.load(flight.id);
  }

  @UseGuards(AuthGuard)
  @ResolveField(() => [Booking])
  async booking(@Parent() flight: Flight, @Context() { loaders }: GqlContext) {
    return loaders.flight.bookingLoader.load(flight.id);
  }

  @UseGuards(AuthGuard)
  @Roles(AuthRoles.admin)
  @Mutation(() => Flight)
  async updateFlightStatus(
    @Args('updateFlightStatusInput')
    updateFlightStatusInput: UpdateFlightStatusInput,
  ) {
    return await this.flightService.updateFlightStatus(updateFlightStatusInput);
  }

  @Subscription(() => Flight, {
    filter: async (payload, variables, context) => {
      // issue in (this)
      // const user = context.extra.user as JwtPayload;
      // const passenger = await this.passengerService.getPassengerByAuthId(
      //   user.id,
      // );
      // const isBooking = await this.bookingServiec.checkPassengerBooking(
      //   payload.flightId,
      //   passenger.id,
      // );
      return (
        payload.passengerId === variables.passengerId &&
        payload.flightId === variables.flightId
        // && isBooking
      );
    },
  })
  flightStatusUpdated(
    @Args('passengerId') passengerId: number,
    @Args('flightId') flightId: number,
  ) {
    return this.pubSub.asyncIterableIterator('flightStatusUpdated');
  }
}

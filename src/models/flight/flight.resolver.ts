import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';
import { FlightModel } from './flight.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FlightService } from './flight.service';
import { Flight } from './gql/flight.object';
import { CreateFlightInput } from './gql/create.input';
import { FlightQueryInput } from './gql/query.input';

@UseGuards(AuthGuard)
@Resolver(() => FlightModel)
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
    @Args('query', ApiFeaturesPipe) options: FlightQueryInput
  ) {
    return await this.flightService.getAllFlights(options);
  }
}

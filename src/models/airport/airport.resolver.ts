import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AirportModel } from './airport.entity';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Airport } from './gql/airport.object';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { AirportService } from './airport.service';
import { CreateAirportInput } from './gql/create.input';
import { GraphQLJSONObject } from 'graphql-type-json';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';

@UseGuards(AuthGuard)
@Resolver(() => AirportModel)
export class AirportResolver {
  constructor(private readonly airtportService: AirportService) {}

  @Mutation(() => Airport)
  @Roles(AuthRoles.admin)
  async createAirport(
    @Args('createAirportInput')
    createAirportInput: CreateAirportInput,
  ): Promise<AirportModel> {
    return await this.airtportService.createAirport(createAirportInput);
  }

  @Query(() => [Airport])
  async getAllAirports(
    @Args('query', ApiFeaturesPipe)
    options: BaseQueryInput,
  ) {
    return await this.airtportService.getAllAirports(options);
  }

  @Query(() => Airport)
  async getAirportDetails(@Args('airportId', ParseIntPipe) airportId: number) {
    return await this.airtportService.getAirportById(airportId);
  }

  @Mutation(() => GraphQLJSONObject)
  @Roles(AuthRoles.admin)
  async deleteAirport(@Args('airportId', ParseIntPipe) airportId: number) {
    return await this.airtportService.deleteAirport(airportId);
  }
}

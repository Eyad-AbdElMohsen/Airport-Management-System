import { Args, Context, Mutation, Query } from '@nestjs/graphql';
import { PassengerService } from './passenger.service';
import { PassengerModel } from './passenger.entity';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { Passenger } from './gql/passenger.object';
import { GqlContext } from 'src/common/types/context.type';
import {
  UpdateMyPassengerDetailsInput,
} from './gql/update.input';
import { GraphQLJSONObject } from 'graphql-type-json';

@UseGuards(AuthGuard)
export class PassengerResolver {
  constructor(private readonly passengerService: PassengerService) {}

  @Query(() => Passenger)
  @Roles(AuthRoles.passenger)
  async getMyPassengerDetails(
    @Context() context: GqlContext,
  ): Promise<PassengerModel> {
    const authId = context.user!.id;
    return await this.passengerService.getPassengerByAuthId(authId);
  }

  @Query(() => Passenger)
  @Roles(AuthRoles.admin)
  async getPassengerDetails(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<PassengerModel> {
    return await this.passengerService.getPassengerById(id);
  }

  @Mutation(() => Passenger)
  @Roles(AuthRoles.passenger)
  async updateMyPassengerDetails(
    @Args('updateMyPassengerDetailsInput')
    updateMyPassengerDetailsInput: UpdateMyPassengerDetailsInput,
    @Context() context: GqlContext,
  ): Promise<PassengerModel> {
    const authId = context.user!.id;
    return await this.passengerService.updateMyPassengerDetails(
      authId,
      updateMyPassengerDetailsInput,
    );
  }


  @Mutation(() => GraphQLJSONObject)
  @Roles(AuthRoles.passenger)
  async deleteMyPassenger(@Context() context: GqlContext) {
    const authId = context.user!.id;
    return await this.passengerService.deletePassenger(authId, true);
  }

  @Mutation(() => GraphQLJSONObject)
  @Roles(AuthRoles.admin)
  async deletePassenger(@Args('id', ParseIntPipe) id: number) {
    return await this.passengerService.deletePassenger(id, false);
  }
}

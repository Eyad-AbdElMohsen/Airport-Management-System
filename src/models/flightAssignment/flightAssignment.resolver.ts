import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FlightAssignmentService } from './flightAssignment.service';
import { FlightAssignmentModel } from './flightAssignment.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { FlightAssignment } from './gql/flightAssignment.object';
import { CreateFlightAssignmentInput } from './gql/create.input';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { GraphQLJSONObject } from 'graphql-type-json';
import { DeleteFlightAssignmentInput } from './gql/delete.input';

@Resolver(() => FlightAssignmentModel)
@UseGuards(AuthGuard)
export class FlightAssignmentResolver {
  constructor(
    private readonly flightAssignmentService: FlightAssignmentService,
  ) {}

  @Roles(AuthRoles.admin)
  @Mutation(() => FlightAssignment)
  async createFlightAssignment(
    @Args('createFlightAssignmentInput')
    createFlightAssignmentInput: CreateFlightAssignmentInput,
  ) {
    return await this.flightAssignmentService.createFlightAssignment(
      createFlightAssignmentInput,
    );
  }

  @Roles(AuthRoles.admin)
  @Mutation(() => GraphQLJSONObject)
  async deletFlightAssignment(
    @Args('deleteFlightAssignmentInput')
    deleteFlightAssignmentInput: DeleteFlightAssignmentInput,
  ) {
    return await this.flightAssignmentService.deleteFlightAssignment(
      deleteFlightAssignmentInput,
    );
  }
}

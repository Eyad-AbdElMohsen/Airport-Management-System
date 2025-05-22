import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StaffModel } from './staff.entity';
import { StaffService } from './staff.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Staff } from './gql/staff.object';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { CreateStaffInput } from './gql/create.input';
import { GqlContext } from 'src/common/types/context.type';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';
import { FindOptions } from 'sequelize';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';

@UseGuards(AuthGuard)
@Resolver(() => StaffModel)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Mutation(() => Staff)
  @Roles(AuthRoles.staff)
  async createMyStaffDetails(
    @Args('createStaffInput') createStaffInput: CreateStaffInput,
    @Context() context: GqlContext,
  ) {
    const authId = context.user!.id;
    return await this.staffService.createStaff(authId, createStaffInput);
  }

  @Query(() => Staff)
  @Roles(AuthRoles.staff)
  async getMyStaffDetails(@Context() context: GqlContext) {
    const authId = context.user!.id;
    return await this.staffService.getStaffByAuthId(authId);
  }

  @Query(() => [Staff])
  @Roles(AuthRoles.staff, AuthRoles.admin)
  async getAllStaff(
    @Args('query', ApiFeaturesPipe)
    options: BaseQueryInput,
  ) {
    return await this.staffService.getAllStaff(options);
  }

  @Mutation(() => GraphQLJSONObject)
  @Roles(AuthRoles.staff)
  async deleteMyStaff(@Context() context: GqlContext) {
    const authId = context.user!.id;
    return await this.staffService.deleteStaff(authId, true);
  }

  @Mutation(() => GraphQLJSONObject)
  @Roles(AuthRoles.admin)
  async deleteStaff(@Args('id', ParseIntPipe) id: number) {
    return await this.staffService.deleteStaff(id, false);
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlaneModel } from './plane.entity';
import { PlaneService } from './plane.service';
import { Plane } from './gql/plane.object';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { CreatePlaneInput } from './gql/create.input';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';
import { GraphQLJSONObject } from 'graphql-type-json';
import { PlaneQueryInput } from './gql/query.input';

@UseGuards(AuthGuard)
@Resolver(() => PlaneModel)
export class PlaneResolver {
  constructor(private readonly planeService: PlaneService) {}

  @Mutation(() => Plane)
  @Roles(AuthRoles.admin)
  async createPlane(
    @Args('createPlaneInput') createPlaneInput: CreatePlaneInput,
  ) {
    return await this.planeService.createPlane(createPlaneInput);
  }

  @Query(() => Plane)
  async getPlane(@Args('planeId', ParseIntPipe) planeId: number) {
    return await this.planeService.getPlaneById(planeId);
  }

  @Query(() => [Plane])
  async getAllPlanes(@Args('query', ApiFeaturesPipe) options: PlaneQueryInput) {
    return await this.planeService.getAllPlanes(options);
  }

  @Mutation(() => GraphQLJSONObject)
  @Roles(AuthRoles.admin)
  async deletePlane(@Args('planeId', ParseIntPipe) planeId: number) {
    return await this.planeService.deletePlane(planeId);
  }
}

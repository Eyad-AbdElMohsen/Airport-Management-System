import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { GraphQLJSONObject } from 'graphql-type-json';
import { BagModel } from './bag.entity';
import { BagService } from './bag.service';
import { Bag } from './gql/bag.object';
import { CreateBagInput } from './gql/create.input';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';
import { BagQueryInput } from './gql/query.input';

@Resolver(() => BagModel)
@UseGuards(AuthGuard)
export class BagResolver {
  constructor(private readonly bagService: BagService) {}

    @Roles(AuthRoles.admin, AuthRoles.staff)
    @Mutation(() => Bag)
    async createBag(
      @Args('createBagInput')
      createBagInput: CreateBagInput,
    ) {
      return await this.bagService.createBag(
        createBagInput,
      );
    }

    @Query(()=> [Bag])
    async getAllBags(
        @Args('query', ApiFeaturesPipe) options: BagQueryInput
    ){
        return await this.bagService.getAllBags(options)
    }
}

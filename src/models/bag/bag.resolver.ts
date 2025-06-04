import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { BagService } from './bag.service';
import { Bag } from './gql/bag.object';
import { CreateBagInput } from './gql/create.input';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';
import { BagQueryInput } from './gql/query.input';
import { UpdateBagStatusInput } from './gql/update.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Bag)
export class BagResolver {
  constructor(
    private readonly bagService: BagService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @UseGuards(AuthGuard)
  @Roles(AuthRoles.admin, AuthRoles.staff)
  @Mutation(() => Bag)
  async createBag(
    @Args('createBagInput')
    createBagInput: CreateBagInput,
  ) {
    return await this.bagService.createBag(createBagInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Bag])
  async getAllBags(@Args('query', ApiFeaturesPipe) options: BagQueryInput) {
    return await this.bagService.getAllBags(options);
  }

  @UseGuards(AuthGuard)
  @Roles(AuthRoles.admin, AuthRoles.staff)
  @Mutation(() => Bag)
  async updateBagStatus(
    @Args('updateBagStatusInput') updateBagStatusInput: UpdateBagStatusInput,
  ) {
    return await this.bagService.updateBagStatus(updateBagStatusInput);
  }

  @Subscription(() => Bag, {
    filter: (payload, variables) => {
      return payload.statusUpdated.passengerId === variables.passengerId;
    },
  })
  statusUpdated(@Args('passengerId') passengerId: number) {
    return this.pubSub.asyncIterableIterator('statusUpdated');
  }
}

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BagRepo } from './bag.repository';
import { CreateBagInput } from './gql/create.input';
import { BagQueryInput } from './gql/query.input';
import { UpdateBagStatusInput } from './gql/update.input';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class BagService {
  constructor(
    private readonly bagRepo: BagRepo,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  async createBag(createBagInput: CreateBagInput) {
    return (await this.bagRepo.create(createBagInput)).dataValues;
  }

  async getAllBags(options: BagQueryInput) {
    try {
      return await this.bagRepo.getAll(options);
    } catch (err) {
      console.log('Error Getting Bags: ', err);
      throw new BadRequestException('Validation Error');
    }
  }

  async updateBagStatus(updateBagStatusInput: UpdateBagStatusInput) {
    const [count, row] = await this.bagRepo.update(updateBagStatusInput);
    if (!count)
      throw new HttpException(
        'No thing updated',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const updatedData = row[0].dataValues;
    
    await this.pubSub.publish('statusUpdated', {
      statusUpdated: updatedData,
    });

    return updatedData;
  }
}

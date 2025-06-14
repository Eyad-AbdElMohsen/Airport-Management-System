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
import { BagModel } from './bag.entity';
import { AuthRepo } from '../auth/auth.repository';
import { QueueService } from 'src/common/queue/queue.service';

@Injectable()
export class BagService {
  constructor(
    private readonly bagRepo: BagRepo,
    @Inject('PUB_SUB') private pubSub: PubSub,
    private readonly authRepo: AuthRepo,
    private readonly queueService: QueueService,
  ) {}

  async createBag(createBagInput: CreateBagInput) {
    return (await this.bagRepo.create(createBagInput)).dataValues;
  }

  async getAllBags(options: BagQueryInput) {
    try {
      return await this.bagRepo.getAll(options);
    } catch (err) {
      console.error('Error Getting Bags: ', err);
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

    const updatedData: BagModel = row[0].dataValues;

    await this.pubSub.publish('statusUpdated', {
      statusUpdated: updatedData,
    });

    const auth = await this.authRepo.getAuthByPassengerId(
      updatedData.passengerId,
    );

    await this.queueService.notifyBagStatus(
      auth!.dataValues.email,
      updatedData.id,
      updatedData.status,
    );

    return updatedData;
  }
}

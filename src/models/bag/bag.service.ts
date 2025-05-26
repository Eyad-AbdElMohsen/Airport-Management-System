import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BagRepo } from './bag.repository';
import { CreateBagInput } from './gql/create.input';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';
import { BagQueryInput } from './gql/query.input';

@Injectable()
export class BagService {
  constructor(private readonly bagRepo: BagRepo) {}

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
}

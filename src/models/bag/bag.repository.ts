import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { BagModel } from './bag.entity';
import { CreateBagInput } from './gql/create.input';
import { FindOptions } from 'sequelize';

@Injectable()
export class BagRepo {
  constructor(
    @InjectModel(BagModel)
    private bagModel: typeof BagModel,
  ) {}

  async create(createBagInput: CreateBagInput) {
    return await this.bagModel.create({ ...createBagInput });
  }

  async getAll(options: FindOptions){
    options.raw = true
    return await this.bagModel.findAll(options)
  }
}

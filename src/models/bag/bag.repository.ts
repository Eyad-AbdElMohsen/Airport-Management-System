import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { BagModel } from './bag.entity';
import { CreateBagInput } from './gql/create.input';
import { FindOptions, where } from 'sequelize';
import { UpdateBagStatusInput } from './gql/update.input';

@Injectable()
export class BagRepo {
  constructor(
    @InjectModel(BagModel)
    private bagModel: typeof BagModel,
  ) {}

  async create(createBagInput: CreateBagInput) {
    return await this.bagModel.create({ ...createBagInput });
  }

  async getAll(options: FindOptions) {
    options.raw = true;
    return await this.bagModel.findAll(options);
  }

  async update(updateBagStatusInput: UpdateBagStatusInput) {
    const { flightId, passengerId, status } = updateBagStatusInput;
    return await this.bagModel.update(
      { status },
      { where: { flightId, passengerId }, returning: true },
    );
  }
}

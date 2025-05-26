import { InjectModel } from '@nestjs/sequelize';
import { PlaneModel } from './plane.entity';
import { Injectable } from '@nestjs/common';
import { CreatePlaneInput } from './gql/create.input';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class PlaneRepo {
  constructor(@InjectModel(PlaneModel) private planeModel: typeof PlaneModel) {}

  async create(createPlaneInput: CreatePlaneInput, transaction: Transaction) {
    return await this.planeModel.create(
      { ...createPlaneInput },
      { transaction },
    );
  }

  async getById(id: number) {
    return await this.planeModel.findByPk(id, { raw: true });
  }

  async getAll(options: FindOptions) {
    options.raw = true;
    return await this.planeModel.findAll(options);
  }

  async delete(id: number) {
    return await this.planeModel.destroy({ where: { id } });
  }
}

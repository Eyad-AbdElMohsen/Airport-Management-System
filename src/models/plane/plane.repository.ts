import { InjectModel } from '@nestjs/sequelize';
import { PlaneModel } from './plane.entity';
import { Injectable } from '@nestjs/common';
import { CreatePlaneInput } from './gql/create.input';
import { FindOptions } from 'sequelize';

@Injectable()
export class PlaneRepo {
  constructor(@InjectModel(PlaneModel) private planeModel: typeof PlaneModel) {}

  async create(createPlaneInput: CreatePlaneInput) {
    return await this.planeModel.create({ ...createPlaneInput });
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

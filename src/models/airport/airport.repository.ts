import { Injectable } from '@nestjs/common';
import { AirportModel } from './airport.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAirportInput } from './gql/create.input';
import { FindOptions } from 'sequelize';

@Injectable()
export class AirportRepo {
  constructor(
    @InjectModel(AirportModel) private airportModel: typeof AirportModel,
  ) {}

  async create(createAirportInput: CreateAirportInput) {
    return await this.airportModel.create({ ...createAirportInput });
  }

  async getAll(options: FindOptions) {
    options.raw = true
    return await this.airportModel.findAll(options);
  }

  async getByid(id: number) {
    return await this.airportModel.findByPk(id, {raw: true});
  }

  async delete(id: number) {
    return this.airportModel.destroy({ where: { id } });
  }
}

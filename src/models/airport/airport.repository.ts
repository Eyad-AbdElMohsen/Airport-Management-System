import { Injectable } from '@nestjs/common';
import { AirportModel } from './airport.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAirportInput } from './gql/createAirport.input';

@Injectable()
export class AirportRepo {
  constructor(
    @InjectModel(AirportModel) private airportModel: typeof AirportModel,
  ) {}

  async create(createAirportInput: CreateAirportInput) {
    return await this.airportModel.create({ ...createAirportInput });
  }

  async getAll() {
    return await this.airportModel.findAll({ raw: true});
  }

  async getByid(id: number) {
    return await this.airportModel.findByPk(id, {raw: true});
  }

  async delete(id: number) {
    return this.airportModel.destroy({ where: { id } });
  }
}

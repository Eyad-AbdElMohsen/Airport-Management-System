import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { FlightModel } from './flight.entity';
import { CreateFlightInput } from './gql/create.input';

@Injectable()
export class FlightRepo {
  constructor(
    @InjectModel(FlightModel) private flightModel: typeof FlightModel,
  ) {}

  async create(createFlightInput: CreateFlightInput) {
    return await this.flightModel.create({ ...createFlightInput });
  }

  async getById(id: number) {
    return await this.flightModel.findByPk(id, { raw: true });
  }

  async getAll(options: FindOptions) {
    options.raw = true;
    return await this.flightModel.findAll(options);
  }
}

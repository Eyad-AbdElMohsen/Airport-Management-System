import { InjectModel } from '@nestjs/sequelize';
import { FlightAssignmentModel } from './flightAssignment.entity';
import { Injectable } from '@nestjs/common';
import { CreateFlightAssignmentInput } from './gql/create.input';
import { DeleteFlightAssignmentInput } from './gql/delete.input';

@Injectable()
export class FlightAssignmentRepo {
  constructor(
    @InjectModel(FlightAssignmentModel)
    private flightAssignmentModel: typeof FlightAssignmentModel,
  ) {}

  async create(createFlightAssignmentInput: CreateFlightAssignmentInput) {
    return this.flightAssignmentModel.create({
      ...createFlightAssignmentInput,
    });
  }

  async getByIds(ids: CreateFlightAssignmentInput) {
    return await this.flightAssignmentModel.findOne({
      where: { ...ids },
      raw: true,
    });
  }

  async delete(deleteFlightAssignmentInput: DeleteFlightAssignmentInput) {
    return await this.flightAssignmentModel.destroy({
      where: { ...deleteFlightAssignmentInput },
    });
  }
}

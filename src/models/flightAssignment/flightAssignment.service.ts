import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FlightAssignmentRepo } from './flightAssignment.repository';
import { CreateFlightAssignmentInput } from './gql/create.input';
import { DeleteFlightAssignmentInput } from './gql/delete.input';

@Injectable()
export class FlightAssignmentService {
  constructor(private readonly flightAssignmentRepo: FlightAssignmentRepo) {}

  async createFlightAssignment(
    createFlightAssignmentInput: CreateFlightAssignmentInput,
  ) {
    const isExist = await this.flightAssignmentRepo.getByIds(
      createFlightAssignmentInput,
    );
    if (isExist) {
      throw new BadRequestException('This FlightAssignment is already exist!');
    }
    return (await this.flightAssignmentRepo.create(createFlightAssignmentInput))
      .dataValues;
  }

  async deleteFlightAssignment(
    deleteFlightAssignmentInput: DeleteFlightAssignmentInput,
  ) {
    const res = await this.flightAssignmentRepo.delete(
      deleteFlightAssignmentInput,
    );
    if (!res) throw new NotFoundException('Flight Assignment Not Found');

    return { message: 'Satff Deleted Successfully!' };
  }
}

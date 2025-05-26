import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PlaneRepo } from './plane.repository';
import { CreatePlaneInput } from './gql/create.input';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PlaneQueryInput } from './gql/query.input';

@Injectable()
export class PlaneService {
  constructor(
    private readonly planeRepo: PlaneRepo,
    private sequelize: Sequelize,
  ) {}

  async createPlane(createPlaneInput: CreatePlaneInput) {
    const transaction: Transaction = await this.sequelize.transaction();
    try {
      return (await this.planeRepo.create(createPlaneInput, transaction))
        .dataValues;
    } catch (err) {
      console.log('Error in creating a Plane: ', err);
      await transaction.rollback();
      throw new InternalServerErrorException(
        'Transaction field, pls try again',
      );
    }
  }

  async getPlaneById(id: number) {
    return await this.planeRepo.getById(id);
  }

  async getAllPlanes(options: PlaneQueryInput) {
    try {
      return await this.planeRepo.getAll(options);
    } catch (err) {
      console.log('Error Getting Staff: ', err);
      throw new HttpException(
        'Filtering Validation Error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deletePlane(id: number) {
    const res = await this.planeRepo.delete(id);
    if (!res) throw new NotFoundException('Plane Not Found');

    return { message: 'Satff Deleted Successfully!' };
  }
}

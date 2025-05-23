import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PlaneRepo } from './plane.repository';
import { CreatePlaneInput } from './gql/create.input';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';

@Injectable()
export class PlaneService {
  constructor(private readonly planeRepo: PlaneRepo) {}

  async createPlane(createPlaneInput: CreatePlaneInput) {
    return (await this.planeRepo.create(createPlaneInput)).dataValues;
  }

  async getPlaneById(id: number) {
    return await this.planeRepo.getById(id);
  }

  async getAllPlanes(options: BaseQueryInput) {
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

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { staffRepo } from './staff.repository';
import { CreateStaffInput } from './gql/create.input';
import { DestroyOptions, FindOptions } from 'sequelize';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepo: staffRepo) {}

  async createStaff(authId: number, createStaffInput: CreateStaffInput) {
    const isExist = await this.staffRepo.getByAuthId(authId);
    if (isExist) throw new NotFoundException('Staff is alrady found!');
    return (await this.staffRepo.create(authId, createStaffInput)).dataValues;
  }

  async getAllStaff(options: BaseQueryInput) {
    try {
      return await this.staffRepo.getAll(options);
    } catch (err) {
      console.log('Error Getting Staff: ', err);
      throw new HttpException(
        'Filtering Validation Error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getStaffByAuthId(authId: number) {
    const staff = await this.staffRepo.getByAuthId(authId);
    if (!staff) throw new NotFoundException('Staff is not found!');
    return staff;
  }

  async deleteStaff(idArg: number, isAuth: boolean) {
    let id = idArg,
      authId = idArg,
      where: DestroyOptions;

    if (isAuth) where = { where: { authId } };
    else where = { where: { id } };

    const res = await this.staffRepo.delete(where);

    if (!res) throw new NotFoundException('Staff Not Found');

    return { message: 'Satff Deleted Successfully!' };
  }
}

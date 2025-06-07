import { InjectModel } from '@nestjs/sequelize';
import { StaffModel } from './staff.entity';
import { Injectable } from '@nestjs/common';
import { CreateStaffInput } from './gql/create.input';
import { DestroyOptions, FindOptions } from 'sequelize';

@Injectable()
export class staffRepo {
  constructor(@InjectModel(StaffModel) private staffModel: typeof StaffModel) {}

  async create(authId: number, createStaffInput: CreateStaffInput) {
    return await this.staffModel.create({
      authId,
      ...createStaffInput,
    });
  }

  async getByAuthId(authId: number) {
    return await this.staffModel.findOne({ where: { authId }, raw: true });
  }

  async getAll(options: FindOptions) {
    options.raw = true;
    return await this.staffModel.findAll(options);
  }

  async delete(where: DestroyOptions) {
    return await this.staffModel.destroy(where);
  }
}

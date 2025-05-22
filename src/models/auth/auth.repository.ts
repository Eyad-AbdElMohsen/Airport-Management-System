import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from './auth.entity';
import { SignupInput } from './gql/signup.input';
import { Injectable } from '@nestjs/common';
import { UpdateRoleInput } from './gql/update.input';
import { FindOptions, Transaction } from 'sequelize';

@Injectable()
export class AuthRepo {
  constructor(@InjectModel(AuthModel) private authModel: typeof AuthModel) {}

  async getAll(options: FindOptions) {
    options.raw = true
    return await this.authModel.findAll(options);
  }

  async getById(id: number) {
    return await this.authModel.findByPk(id, { raw: true });
  }

  async getByEmail(email: string) {
    return await this.authModel.findOne({ where: { email }, raw: true });
  }

  async create(signupInput: SignupInput) {
    return await this.authModel.create({ ...signupInput });
  }

  async update(id: number, updateMyAuthInput: UpdateRoleInput) {
    return await this.authModel.update(
      {
        ...updateMyAuthInput,
      },
      {
        where: { id },
        returning: true,
      },
    );
  }

  async delete(id: number) {
    return await this.authModel.destroy({ where: { id } });
  }
}

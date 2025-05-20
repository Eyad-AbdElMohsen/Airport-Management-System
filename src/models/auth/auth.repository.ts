import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from './auth.entity';
import { SignupInput } from './gql/signup.input';
import { Injectable } from '@nestjs/common';
import { UpdateMyAuthInput } from './gql/update.input';

@Injectable()
export class AuthRepo {
  constructor(@InjectModel(AuthModel) private authModel: typeof AuthModel) {}

  async getAll() {
    return await this.authModel.findAll({ raw: true });
  }

  async getById(id: number) {
    return await this.authModel.findByPk(id, { raw: true });
  }

  async getByEmail(email: string) {
    return await this.authModel.findOne({ where: { email }, raw: true });
  }

  async create(signupInput: SignupInput) {
    const { name, email, password, role } = signupInput;
    return await this.authModel.create({ name, email, password, role });
  }

  async update(id: number, updateMyAuthInput: UpdateMyAuthInput) {
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

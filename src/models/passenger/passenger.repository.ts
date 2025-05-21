import { InjectModel } from '@nestjs/sequelize';
import { PassengerModel } from './passenger.entity';
import { Injectable } from '@nestjs/common';
import { UpdateMyPassengerDetailsInput } from './gql/update.input';
import { DestroyOptions } from 'sequelize';

@Injectable()
export class PassengerRepo {
  constructor(
    @InjectModel(PassengerModel) private passengerModel: typeof PassengerModel,
  ) {}

  async updatePassenger(
    authId: number,
    updateMyPassengerDetailsInput: UpdateMyPassengerDetailsInput,
  ) {
    return await this.passengerModel.update(
      {
        ...updateMyPassengerDetailsInput,
      },
      { where: { authId }, returning: true },
    );
  }

  async getByid(id: number) {
    return this.passengerModel.findByPk(id, { raw: true });
  }

  async getByPassport(passportNumber: number) {
    return await this.passengerModel.findOne({
      where: { passportNumber },
      raw: true,
    });
  }

  async getByAuthId(authId: number) {
    return await this.passengerModel.findOne({ where: { authId }, raw: true });
  }

  async delete(where: DestroyOptions) {
    return await this.passengerModel.destroy(where);
  }
}

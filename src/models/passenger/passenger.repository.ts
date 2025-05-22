import { InjectModel } from '@nestjs/sequelize';
import { PassengerModel } from './passenger.entity';
import { Injectable } from '@nestjs/common';
import { UpdateMyPassengerDetailsInput } from './gql/update.input';
import { DestroyOptions } from 'sequelize';
import { Resolver } from '@nestjs/graphql';
import { CreatePassengerInput } from './gql/create.input';

@Resolver(() => PassengerModel)
export class PassengerRepo {
  constructor(
    @InjectModel(PassengerModel) private passengerModel: typeof PassengerModel,
  ) {}

  async create(authId: number, createPassengerInput: CreatePassengerInput) {
    return await this.passengerModel.create({
      ...createPassengerInput,
      authId,
    });
  }

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

  async getAll() {
    return await this.passengerModel.findAll({ raw: true });
  }

  async getByAuthId(authId: number) {
    return await this.passengerModel.findOne({ where: { authId }, raw: true });
  }

  async delete(where: DestroyOptions) {
    return await this.passengerModel.destroy(where);
  }
}

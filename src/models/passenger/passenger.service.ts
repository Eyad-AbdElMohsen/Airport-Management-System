import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassengerRepo } from './passenger.repository';
import { UpdateMyPassengerDetailsInput } from './gql/update.input';
import { DestroyOptions } from 'sequelize';
import { CreatePassengerInput } from './gql/create.input';
import { PassengerQueryInput } from './gql/query.input';

@Injectable()
export class PassengerService {
  constructor(private readonly passengerRepo: PassengerRepo) {}

  async createPassenger(
    authId: number,
    createPassengerInput: CreatePassengerInput,
  ) {
    const isExist = await this.passengerRepo.getByAuthId(authId);
    if (isExist) throw new NotFoundException('Passenger is alrady found!');
    return (await this.passengerRepo.create(authId, createPassengerInput))
      .dataValues;
  }

  async getPassengerByAuthId(authId: number) {
    const passenger = await this.passengerRepo.getByAuthId(authId);
    if (!passenger) throw new NotFoundException('No Passenger Found');
    return passenger;
  }

  async getAllPassengers(options: PassengerQueryInput) {
    try {
      return await this.passengerRepo.getAll(options);
    } catch (err) {
      console.error('Error Getting Passengers: ', err);
      throw new HttpException(
        'Filtering Validation Error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateMyPassengerDetails(
    authId: number,
    updateMyPassengerDetailsInput: UpdateMyPassengerDetailsInput,
  ) {
    await this.getPassengerByAuthId(authId);

    const [count, row] = await this.passengerRepo.updatePassenger(
      authId,
      updateMyPassengerDetailsInput,
    );
    if (!count)
      throw new HttpException(
        'No thing updated',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return row[0].dataValues;
  }

  async deletePassenger(idArg: number, isAuth: boolean) {
    let id = idArg,
      authId = idArg,
      where: DestroyOptions;

    if (isAuth) where = { where: { authId } };
    else where = { where: { id } };

    const res = await this.passengerRepo.delete(where);

    if (!res) throw new NotFoundException('Passenger Not Found');

    return { message: 'Passenger Deleted Successfully!' };
  }
}

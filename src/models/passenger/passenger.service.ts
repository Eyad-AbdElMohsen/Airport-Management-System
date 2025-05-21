import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassengerRepo } from './passenger.repository';
import { UpdateMyPassengerDetailsInput } from './gql/update.input';
import { DestroyOptions, WhereOptions } from 'sequelize';

@Injectable()
export class PassengerService {
  constructor(private readonly passengerRepo: PassengerRepo) {}

  async getPassengerByPassport(passport: number) {
    return await this.passengerRepo.getByPassport(passport);
  }

  async getPassengerByAuthId(authId: number) {
    const passenger = await this.passengerRepo.getByAuthId(authId);
    if (!passenger) throw new NotFoundException('No Passenger Found');
    return passenger;
  }

  async getPassengerById(id: number) {
    const passenger = await this.passengerRepo.getByid(id);
    if (!passenger) throw new NotFoundException('No Passenger Found');
    return passenger;
  }

  async updateMyPassengerDetails(
    authId: number,
    updateMyPassengerDetailsInput: UpdateMyPassengerDetailsInput,
  ) {
    await this.getPassengerByAuthId(authId);
    const [count, row] = await this.passengerRepo.updatePassenger(authId, updateMyPassengerDetailsInput);
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

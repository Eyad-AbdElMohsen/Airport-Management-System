import { CreationOptional } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  AfterCreate,
} from 'sequelize-typescript';
import { AuthRoles } from 'src/common/types/auth.type';
import { PassengerModel } from '../passenger/passenger.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Table
export class AuthModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({
    type: DataType.ENUM(
      AuthRoles.admin,
      AuthRoles.passenger,
      AuthRoles.staff,
      AuthRoles.user,
    ),
    defaultValue: AuthRoles.user,
  })
  role: string;

  @HasOne(() => PassengerModel)
  passenger: PassengerModel;

  @AfterCreate
  static async createPassengerIdOnly(instance: AuthModel, options: any) {
    if (instance.dataValues.role != AuthRoles.passenger) return;

    const transaction = options.transaction;
    if (!transaction) {
      throw new HttpException(
        'Transaction is required for "createPassengerIdOnly" hook',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      console.log(instance.dataValues)
      await PassengerModel.create(
        { authId: instance.dataValues.id },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      console.log('Error in creating a passenger hook: ', err);
      await transaction.rollback();
      throw new HttpException(
        'Transaction field, pls try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

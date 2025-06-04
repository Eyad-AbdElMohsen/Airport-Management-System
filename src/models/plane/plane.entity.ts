import { CreationOptional } from 'sequelize';
import {
  AfterCreate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { FlightModel } from '../flight/flight.entity';
import { SeatModel } from '../seat/seat.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { SeatCode } from 'src/common/types/seat.type';

@Table
export class PlaneModel extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @HasMany(() => FlightModel)
  flights: FlightModel[];

  @HasMany(() => SeatModel)
  seats: SeatModel[];

  @AfterCreate
  static async createSeats(instance: PlaneModel, options: any) {
    const transaction = options.transaction;
    if (!transaction) {
      throw new InternalServerErrorException(
        'Transaction is required for "createSeats" hook',
      );
    }
    try {
      const rows = ['A', 'B', 'C'];
      const seats: { seatCode: SeatCode; planeId: number }[] = [];

      for (const row of rows) {
        for (let i = 1; i <= 5; i++) {
          const code = `${row}${i}`;
          seats.push({
            seatCode: code as SeatCode,
            planeId: instance.id,
          });
        }
      }
      await SeatModel.bulkCreate(seats, { transaction });
      await transaction.commit();
    } catch (err) {
      console.log('Error in creating Seats hook: ', err);
      await transaction.rollback();
      throw new InternalServerErrorException(
        'Transaction field, pls try again',
      );
    }
  }

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

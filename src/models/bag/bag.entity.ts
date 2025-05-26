import { CreationOptional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BagStatus, BagTypes } from 'src/common/types/bag.type';
import { FlightModel } from '../flight/flight.entity';
import { PassengerModel } from '../passenger/passenger.entity';

@Table
export class BagModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.ENUM(...Object.values(BagTypes)) })
  type: BagTypes;

  @Column({ type: DataType.ENUM(...Object.values(BagStatus)) })
  status: BagStatus;

  @ForeignKey(() => FlightModel)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  flightId: number;
  @BelongsTo(() => FlightModel)
  flight: FlightModel;

  @ForeignKey(() => PassengerModel)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  passengerId: number;
  @BelongsTo(() => PassengerModel)
  passenger: PassengerModel;

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

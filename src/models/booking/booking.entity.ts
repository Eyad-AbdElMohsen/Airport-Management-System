import { CreationOptional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { FlightModel } from '../flight/flight.entity';
import { PassengerModel } from '../passenger/passenger.entity';
import { SeatModel } from '../seat/seat.entity';

@Table
export class BookingModel extends Model {
  @ForeignKey(() => FlightModel)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  flightId: number;
  @BelongsTo(() => FlightModel)
  flight: FlightModel;

  @ForeignKey(() => PassengerModel)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  passengerId: number;
  @BelongsTo(() => PassengerModel)
  passenger: PassengerModel;

  @ForeignKey(() => SeatModel)
  @Column({ type: DataType.INTEGER })
  seatId: number;
  @BelongsTo(() => SeatModel)
  seat: SeatModel;

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

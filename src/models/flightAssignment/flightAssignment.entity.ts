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
import { StaffModel } from '../staff/staff.entity';

@Table
export class FlightAssignmentModel extends Model {
  @ForeignKey(() => FlightModel)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  flightId: number;
  @BelongsTo(() => FlightModel)
  flight: FlightModel;

  @ForeignKey(() => StaffModel)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  staffId: number;
  @BelongsTo(() => StaffModel)
  staff: StaffModel;

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

import { CreationOptional } from 'sequelize';
import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { StaffModel } from '../staff/staff.entity';
import { FlightModel } from '../flight/flight.entity';

@Table
export class AirportModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING, unique: true })
  code: string;

  @HasMany(() => StaffModel)
  staff: StaffModel[];

  @HasMany(() => FlightModel, { foreignKey: 'departureId' })
  departure: FlightModel[];

  @HasMany(() => FlightModel, { foreignKey: 'destinationId' })
  destination: FlightModel[];

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

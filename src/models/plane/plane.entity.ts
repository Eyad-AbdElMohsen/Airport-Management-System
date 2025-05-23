import { CreationOptional } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { FlightModel } from '../flight/flight.entity';

@Table
export class PlaneModel extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @HasMany(() => FlightModel)
  flight: FlightModel[]

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

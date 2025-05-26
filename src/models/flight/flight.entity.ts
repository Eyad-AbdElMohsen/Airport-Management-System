import { CreationOptional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { FlightStatus } from 'src/common/types/flightStatus.type';
import { AirportModel } from '../airport/airport.entity';
import { PlaneModel } from '../plane/plane.entity';

@Table
export class FlightModel extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.INTEGER, unique: true })
  num: number;

  @Column({ type: DataType.STRING })
  fromCountry: string;

  @Column({ type: DataType.STRING })
  toCountry: string;

  @Column({
    type: DataType.ENUM(...Object.values(FlightStatus)),
    defaultValue: FlightStatus.ON_TIME,
  })
  status: FlightStatus;

  @ForeignKey(() => PlaneModel)
  @Column({ type: DataType.INTEGER })
  planeId: number;
  @BelongsTo(() => PlaneModel)
  plane: PlaneModel;

  @ForeignKey(() => AirportModel)
  @Column({ type: DataType.INTEGER })
  departureId: number;
  @BelongsTo(() => AirportModel)
  departure: AirportModel;

  @Column({ type: DataType.DATE })
  departureTime: Date;

  @ForeignKey(() => AirportModel)
  @Column({ type: DataType.INTEGER })
  destinationId: number;
  @BelongsTo(() => AirportModel)
  destination: AirportModel;

  @Column({ type: DataType.DATE })
  arrivalTime: Date;

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

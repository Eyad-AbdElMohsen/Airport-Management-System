import { CreationOptional } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { FlightStatus } from 'src/common/types/flightStatus.type';
import { AirportModel } from '../airport/airport.entity';
import { PlaneModel } from '../plane/plane.entity';
import { FlightAssignmentModel } from '../flightAssignment/flightAssignment.entity';
import { BagModel } from '../bag/bag.entity';
import { BookingModel } from '../booking/booking.entity';
import { StaffModel } from '../staff/staff.entity';
import { PassengerModel } from '../passenger/passenger.entity';

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

  @HasMany(() => FlightAssignmentModel)
  flightAssignment: FlightAssignmentModel[];

  @BelongsToMany(() => PassengerModel, () => BookingModel)
  passengers: PassengerModel[];

  @BelongsToMany(() => StaffModel, () => FlightAssignmentModel)
  staff: StaffModel[];

  @HasMany(() => BookingModel)
  booking: BookingModel[];

  @HasMany(() => BagModel)
  bag: BagModel[];

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

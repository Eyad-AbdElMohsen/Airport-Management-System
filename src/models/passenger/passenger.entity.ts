import { CreationOptional } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { AuthModel } from '../auth/auth.entity';
import { BagModel } from '../bag/bag.entity';
import { BookingModel } from '../booking/booking.entity';
import { FlightModel } from '../flight/flight.entity';

@Table
export class PassengerModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.INTEGER, unique: true })
  passportNumber: number;

  @Column({ type: DataType.STRING })
  nationality: string;

  @ForeignKey(() => AuthModel) // specify that this column from another model
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  authId: number;
  @BelongsTo(() => AuthModel) // specify the relation between models
  auth: AuthModel;

  @HasMany(() => BagModel)
  bags: BagModel[];

  @HasMany(() => BookingModel)
  bookings: BookingModel[];

  @BelongsToMany(() => FlightModel, ()=> BookingModel)
  flights: FlightModel[];

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

import { CreationOptional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { AuthModel } from '../auth/auth.entity';
import { AirportModel } from '../airport/airport.entity';
import { StaffRoles } from 'src/common/types/staff.type';
import { FlightAssignmentModel } from '../flightAssignment/flightAssignment.entity';

@Table
export class StaffModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({
    type: DataType.ENUM(...Object.values(StaffRoles)),
    defaultValue: StaffRoles.els,
  })
  role: string;

  @ForeignKey(() => AuthModel)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  authId: number;
  @BelongsTo(() => AuthModel)
  auth: AuthModel;

  @ForeignKey(() => AirportModel)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  airportId: number;
  @BelongsTo(() => AirportModel)
  airport: AirportModel;

  @HasMany(()=> FlightAssignmentModel)
  flightAssignment: FlightAssignmentModel

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

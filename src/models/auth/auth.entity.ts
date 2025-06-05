import { CreationOptional } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  AfterCreate,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { AuthRoles } from 'src/common/types/auth.type';
import { PassengerModel } from '../passenger/passenger.entity';

@Table
export class AuthModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(AuthRoles)),
    defaultValue: AuthRoles.user,
  })
  role: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  isVerified: boolean;

  @Column({ type: DataType.STRING })
  verificationCode: string;

  @HasOne(() => PassengerModel)
  passenger: PassengerModel;

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

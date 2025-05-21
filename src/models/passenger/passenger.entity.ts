import { CreationOptional } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { AuthModel } from '../auth/auth.entity';

@Table
export class PassengerModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @Column({ type: DataType.INTEGER, unique: true, allowNull: true })
  passportNumber: number;

  @Column({ type: DataType.STRING, allowNull: true })
  nationality: string;

  @ForeignKey(() => AuthModel) // specify that this column from another model
  @Column({ type: DataType.INTEGER, allowNull: true })
  authId: number;
  @BelongsTo(() => AuthModel) // specify the relation between models
  auth: AuthModel;

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

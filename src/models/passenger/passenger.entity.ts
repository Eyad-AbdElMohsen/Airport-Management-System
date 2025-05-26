import { CreationOptional } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { AuthModel } from '../auth/auth.entity';
import { BagModel } from '../bag/bag.entity';

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

  @HasMany(()=> BagModel)
  bag: BagModel

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

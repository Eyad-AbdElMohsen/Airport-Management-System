import { CreationOptional } from 'sequelize';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { AuthRoles } from 'src/common/types/auth.type';

@Table
export class AuthModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({
    type: DataType.ENUM(
      AuthRoles.admin,
      AuthRoles.passenger,
      AuthRoles.staff,
      AuthRoles.user,
    ),
    defaultValue: AuthRoles.user,
  })
  role: string;

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

import { CreationOptional } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { SeatCode } from 'src/common/types/seat.type';
import { PlaneModel } from 'src/models/plane/plane.entity';

@Table
export class SeatModel extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.ENUM(...Object.values(SeatCode)) })
  seatCode: SeatCode;

  @ForeignKey(() => PlaneModel)
  @Column({ type: DataType.INTEGER })
  planeId: number;

  @BelongsTo(() => PlaneModel)
  plane: PlaneModel;

  @Column({ type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @Column({ type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;
}

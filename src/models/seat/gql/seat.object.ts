import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SeatCode } from 'src/common/types/seat.type';

@ObjectType()
export class Seat {
  @Field(() => Int)
  id: number;
  @Field()
  seatCode: SeatCode;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

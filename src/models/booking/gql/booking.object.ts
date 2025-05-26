import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Booking {
  @Field(() => Int)
  flightId: number;
  @Field(() => Int)
  passengerId: number;
  @Field(() => Int)
  seatId: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BagStatus, BagTypes } from 'src/common/types/bag.type';

@ObjectType()
export class Bag {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  flightId: number;
  @Field(() => Int)
  passengerId: number;
  @Field()
  type: BagTypes;
  @Field()
  status: BagStatus;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

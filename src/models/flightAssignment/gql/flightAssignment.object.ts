import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FlightAssignment {
  @Field(() => Int)
  flightId: number;
  @Field(()=> Int)
  staffId: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

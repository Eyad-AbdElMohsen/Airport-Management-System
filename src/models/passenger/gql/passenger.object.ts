import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Passenger {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field(() => Int)
  passportNumber: number;
  @Field()
  nationality: string;
  @Field(() => Int)
  authId: number;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date;
}

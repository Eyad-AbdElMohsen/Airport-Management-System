import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Passenger {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  name: string;
  @Field(() => Int, { nullable: true })
  passportNumber: number;
  @Field({ nullable: true })
  nationality: string;
  @Field(() => Int)
  authId: number;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date;
}

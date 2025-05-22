import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Airport {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  location: string;
  @Field()
  email: string;
  @Field()
  code: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

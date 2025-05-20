import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthRoles } from 'src/common/types/auth.type';

@ObjectType()
export class Auth {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  role: AuthRoles;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date;
}

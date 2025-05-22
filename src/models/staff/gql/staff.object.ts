import { Field, Int, ObjectType } from '@nestjs/graphql';
import { StaffRoles } from 'src/common/types/staff.type';

@ObjectType()
export class Staff {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  role: StaffRoles;
  @Field(() => Int)
  authId: number;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date;
}

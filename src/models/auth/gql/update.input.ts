import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { AuthRoles } from 'src/common/types/auth.type';

@InputType()
export class UpdateRoleInput {
  @Field()
  @IsIn(Object.values(AuthRoles))
  role: string;
}

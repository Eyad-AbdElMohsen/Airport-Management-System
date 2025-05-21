import { Field, InputType } from '@nestjs/graphql';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthRoles } from 'src/common/types/auth.type';

@InputType()
export class UpdateRoleInput {
  @Field()
  @IsIn([AuthRoles.admin, AuthRoles.passenger, AuthRoles.staff, AuthRoles.user])
  role: string;
}

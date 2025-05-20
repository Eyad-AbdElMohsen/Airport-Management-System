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

@InputType()
export class UpdateMyAuthInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(4, { message: 'Name must be at least 4 characters' })
  @MaxLength(15, { message: 'Name must be less than 15 characters' })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn([AuthRoles.passenger, AuthRoles.user])
  role?: string;
}

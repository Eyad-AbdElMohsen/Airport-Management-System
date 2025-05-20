import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsUnique } from 'src/common/validators/IsUnique.validator';
import { AuthModel } from '../auth.entity';
import { AuthRoles } from 'src/common/types/auth.type';

@InputType()
export class SignupInput {
  @IsEmail()
  @IsUnique(AuthModel, { message: 'Email must be unique' })
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters' })
  @MaxLength(15, { message: 'Name must be less than 15 characters' })
  @Field()
  name: string;

  @Field()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password must be at least 5 characters' })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  password: string;

  @Field()
  @IsIn([AuthRoles.passenger, AuthRoles.user])
  role: string;
}

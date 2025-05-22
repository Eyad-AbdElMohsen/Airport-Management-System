import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsIn, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { IsUnique } from 'src/common/validators/IsUnique.validator';
import { AuthModel } from '../auth.entity';
import { AuthRoles } from 'src/common/types/auth.type';

@InputType()
export class SignupInput {
  @IsEmail()
  @IsUnique(AuthModel, { message: 'Email must be unique' })
  @Field()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password must be at least 5 characters' })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  password: string;

  @Field()
  @IsIn([AuthRoles.passenger, AuthRoles.user])
  role: string;
}

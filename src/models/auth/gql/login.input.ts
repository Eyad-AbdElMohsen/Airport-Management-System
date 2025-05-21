import { OmitType } from '@nestjs/mapped-types';
import { SignupInput } from './signup.input';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class LoginInput extends OmitType(SignupInput, ['role']) {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  password: string;
}

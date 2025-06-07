import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class VerifyInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'Code must be exactly 6 characters' })
  @Field()
  code: string;
}

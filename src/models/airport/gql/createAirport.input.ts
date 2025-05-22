import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from 'src/common/validators/IsUnique.validator';
import { AirportModel } from '../airport.entity';

@InputType()
export class CreateAirportInput {
  @Field()
  @IsString()
  @MinLength(4, { message: 'Name must be at least 4 characters' })
  @MaxLength(15, { message: 'Name must be less than 15 characters' })
  name: string;

  @Field()
  @IsString()
  @MinLength(4, { message: 'location must be at least 4 characters' })
  @MaxLength(25, { message: 'location must be less than 25 characters' })
  location: string;

  @Field()
  @IsEmail()
  @IsUnique(AirportModel, { message: 'Email must be unique' })
  email: string;

  @Field()
  @IsString()
  @MinLength(3, { message: 'Code must be at least 3 characters' })
  @MaxLength(3, { message: 'Code must be at most 3 characters' })
  @IsUnique(AirportModel, { message: 'Code must be unique' })
  code: string;
}

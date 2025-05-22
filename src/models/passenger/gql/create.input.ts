import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PassengerModel } from '../passenger.entity';
import { IsUnique } from 'src/common/validators/IsUnique.validator';

@InputType()
export class CreatePassengerInput {
  @Field({ nullable: true })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(15, { message: 'Name must be less than 15 characters' })
  name?: string;

  @Field(() => Int, { nullable: true })
  @Min(1000000, { message: 'passport number must be 7 digits' })
  @Max(9999999, { message: 'passport number must be 7 digits' })
  @IsUnique(PassengerModel)
  passportNumber?: number;

  @Field( { nullable: true })
  @IsString()
  nationality?: string;
}
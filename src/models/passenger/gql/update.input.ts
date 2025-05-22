import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PassengerModel } from '../passenger.entity';
import { IsUnique } from 'src/common/validators/IsUnique.validator';

@InputType()
export class UpdateMyPassengerDetailsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(15, { message: 'Name must be less than 15 characters' })
  name?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1000000, { message: 'passport number must be 7 digits' })
  @Max(9999999, { message: 'passport number must be 7 digits' })
  @IsUnique(PassengerModel)
  passportNumber?: number;

  @Field( { nullable: true })
  @IsOptional()
  @IsString()
  nationality?: string;
}

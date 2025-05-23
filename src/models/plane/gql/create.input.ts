import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from 'src/common/validators/IsUnique.validator';
import { PlaneModel } from '../plane.entity';

@InputType()
export class CreatePlaneInput {
  @Field()
  @IsString()
  @IsUnique(PlaneModel)
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(8, { message: 'Name must be less than 15 characters' })
  name: string;
}

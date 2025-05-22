import { InputType, Field } from '@nestjs/graphql';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { IsInColumns } from '../validators/IsInColumns.validators';
import { StaffModel } from 'src/models/staff/staff.entity';

@InputType()
export class BaseQueryInput {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Field({ nullable: true })
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Field({ nullable: true })
  limit?: number;

  @IsOptional()
  @IsString()
  @IsInColumns(StaffModel)
  @Field({ nullable: true })
  sort?: string;

  @IsOptional()
  @IsObject({ message: 'Filters must be a key-value object' })
  @IsInColumns(StaffModel)
  @Field(() => GraphQLJSONObject, { nullable: true })
  filters?: Record<string, string | number | Date>;
  // filters: {
  //   name: "ahmed",
  //   nationality: "egypt"
  // }
}

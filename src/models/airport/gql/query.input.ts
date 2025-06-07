import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { IsInColumns } from 'src/common/validators/IsInColumns.validators';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AirportModel } from '../airport.entity';

@InputType()
export class AirportQueryInput extends BaseQueryInput {
  @IsOptional()
  @IsString()
  @IsInColumns(AirportModel)
  @Field({ nullable: true })
  sort?: string;

  @IsOptional()
  @IsObject({ message: 'Filters must be a key-value object' })
  @IsInColumns(AirportModel)
  @Field(() => GraphQLJSONObject, { nullable: true })
  filters?: Record<string, string | number | Date>;
}

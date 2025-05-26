import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { IsInColumns } from 'src/common/validators/IsInColumns.validators';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';
import { GraphQLJSONObject } from 'graphql-type-json';
import { FlightModel } from '../flight.entity';

@InputType()
export class FlightQueryInput extends BaseQueryInput {
  @IsOptional()
  @IsString()
  @IsInColumns(FlightModel)
  @Field({ nullable: true })
  sort?: string;
  
  @IsOptional()
  @IsObject({ message: 'Filters must be a key-value object' })
  @IsInColumns(FlightModel)
  @Field(() => GraphQLJSONObject, { nullable: true })
  filters?: Record<string, string | number | Date>;
}

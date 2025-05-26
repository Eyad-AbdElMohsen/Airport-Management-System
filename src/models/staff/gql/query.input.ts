import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { IsInColumns } from 'src/common/validators/IsInColumns.validators';
import { StaffModel } from '../staff.entity';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class StaffQueryInput extends BaseQueryInput {
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
}

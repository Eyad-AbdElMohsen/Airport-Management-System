import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { IsInColumns } from 'src/common/validators/IsInColumns.validators';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthModel } from '../auth.entity';

@InputType()
export class AuthQueryInput extends BaseQueryInput {
  @IsOptional()
  @IsString()
  @IsInColumns(AuthModel)
  @Field({ nullable: true })
  sort?: string;

  @IsOptional()
  @IsObject({ message: 'Filters must be a key-value object' })
  @IsInColumns(AuthModel)
  @Field(() => GraphQLJSONObject, { nullable: true })
  filters?: Record<string, string | number | Date>;
}

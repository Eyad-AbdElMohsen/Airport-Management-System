import { InputType, Field } from '@nestjs/graphql';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';


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
}

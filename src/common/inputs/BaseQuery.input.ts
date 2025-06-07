import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

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

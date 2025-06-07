import { Field, InputType, Int } from '@nestjs/graphql';
import { FlightStatus } from 'src/common/types/flightStatus.type';
import { FlightModel } from '../flight.entity';
import { IsDate, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsExistInDB } from 'src/common/validators/IsInDB.validator';
import { IsNotPasteDate } from 'src/common/validators/IsNotPastDate.validator';

@InputType()
export class UpdateFlightStatusInput {
  @Field(() => Int)
  @IsExistInDB(FlightModel)
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  @IsIn([FlightStatus.CANCELED, FlightStatus.DELAYED, FlightStatus.ON_TIME])
  status: FlightStatus;

  @Field({ nullable: true })
  @IsDate()
  @IsNotPasteDate()
  @IsOptional()
  departureTime?: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  @IsNotPasteDate()
  arrivalTime?: Date;
}

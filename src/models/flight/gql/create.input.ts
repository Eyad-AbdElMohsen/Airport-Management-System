import { Field, InputType, Int } from '@nestjs/graphql';
import { FlightStatus } from 'src/common/types/flightStatus.type';
import { IsUnique } from 'src/common/validators/IsUnique.validator';
import { FlightModel } from '../flight.entity';
import { IsDate, IsIn, IsNumber, IsString } from 'class-validator';
import { IsExistInDB } from 'src/common/validators/IsInDB.validator';
import { PlaneModel } from 'src/models/plane/plane.entity';
import { AirportModel } from 'src/models/airport/airport.entity';
import { IsNotPasteDate } from 'src/common/validators/IsNotPastDate.validator';

@InputType()
export class CreateFlightInput {
  @Field(() => Int)
  @IsUnique(FlightModel)
  @IsNumber()
  num: number;

  @Field()
  @IsString()
  fromCountry: string;

  @Field()
  @IsString()
  toCountry: string;

  @Field()
  @IsString()
  @IsIn([FlightStatus.CANCELED, FlightStatus.DELAYED, FlightStatus.ON_TIME])
  status: FlightStatus;

  @Field(() => Int)
  @IsNumber()
  @IsExistInDB(PlaneModel)
  planeId: number;

  @Field()
  @IsNumber()
  @IsExistInDB(AirportModel)
  departureId: number;

  @Field()
  @IsDate()
  @IsNotPasteDate()
  departureTime: Date;

  @Field()
  @IsNumber()
  @IsExistInDB(AirportModel)
  destinationId: number;

  @Field()
  @IsDate()
  @IsNotPasteDate()
  arrivalTime: Date;
}

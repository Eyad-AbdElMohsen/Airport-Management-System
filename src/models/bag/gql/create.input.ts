import { Field, InputType, Int } from '@nestjs/graphql';
import { BagStatus, BagTypes } from 'src/common/types/bag.type';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { IsExistInDB } from 'src/common/validators/IsInDB.validator';
import { FlightModel } from 'src/models/flight/flight.entity';
import { PassengerModel } from 'src/models/passenger/passenger.entity';

@InputType()
export class CreateBagInput {
  @Field(() => Int)
  @IsNumber()
  @IsExistInDB(FlightModel)
  flightId: number;
  
  @Field(() => Int)
  @IsNumber()
  @IsExistInDB(PassengerModel)
  passengerId: number;
  
  @Field()
  @IsString()
  @IsIn(Object.values(BagTypes))
  type: BagTypes;
  
  @Field()
  @IsString()
  @IsIn(Object.values(BagStatus))
  status: BagStatus;
}

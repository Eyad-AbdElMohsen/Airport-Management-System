import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { IsExistInDB } from 'src/common/validators/IsInDB.validator';
import { FlightModel } from 'src/models/flight/flight.entity';
import { PassengerModel } from 'src/models/passenger/passenger.entity';
import { SeatModel } from 'src/models/seat/seat.entity';
import { StaffModel } from 'src/models/staff/staff.entity';

@InputType()
export class CreateBookingInput {
  @Field(() => Int)
  @IsNumber()
  @IsExistInDB(FlightModel)
  flightId: number;
  
  @IsNumber()
  @IsExistInDB(SeatModel)
  @Field(() => Int)
  seatId: number;
}

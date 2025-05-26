import { Field, Int, InputType } from '@nestjs/graphql';
import { IsExistInDB } from 'src/common/validators/IsInDB.validator';
import { FlightModel } from 'src/models/flight/flight.entity';
import { StaffModel } from 'src/models/staff/staff.entity';

@InputType()
export class CreateFlightAssignmentInput {
  @Field(() => Int)
  @IsExistInDB(FlightModel)
  flightId: number;
  @Field(() => Int)
  @IsExistInDB(StaffModel)
  staffId: number;
}

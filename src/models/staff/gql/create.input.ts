import { Field, InputType, Int } from '@nestjs/graphql';
import { StaffRoles } from 'src/common/types/staff.type';
import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { IsExistInDB } from 'src/common/validators/IsInDB.validator';
import { AirportModel } from 'src/models/airport/airport.entity';

@InputType()
export class CreateStaffInput {
  @Field()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(15, { message: 'Name must be less than 15 characters' })
  name: string;

  @Field()
  @IsIn(Object.values(StaffRoles))
  role: StaffRoles;

  @Field(() => Int)
  @IsExistInDB(AirportModel)
  airportId: number;
}

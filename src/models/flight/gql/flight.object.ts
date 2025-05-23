import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FlightStatus } from 'src/common/types/flightStatus.type';

@ObjectType()
export class Flight {
  @Field(() => Int)
  id: number;
  @Field()
  fromCountry: string;
  @Field()
  toCountry: string;
  @Field()
  num: number;
  @Field()
  status: FlightStatus;
  @Field()
  planeId: number;
  @Field()
  departureId: number;
  @Field()
  departureTime: Date;
  @Field()
  destinationId: number;
  @Field()
  arrivalTime: Date;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

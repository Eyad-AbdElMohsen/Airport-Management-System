import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { BookingModel } from "./booking.entity";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/gaurds/auth.gaurd";
import { BookingService } from "./booking.service";
import { Roles } from "src/common/decorators/roles.decoratore";
import { AuthRoles } from "src/common/types/auth.type";
import { Booking } from "./gql/booking.object";
import { CreateBookingInput } from "./gql/create.input";
import { GqlContext } from "src/common/types/context.type";


@Resolver(() => BookingModel)
@UseGuards(AuthGuard)
export class BookingResolver {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Roles(AuthRoles.passenger)
  @Mutation(() => Booking)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
    @Context() context: GqlContext
  ){
    const authId = context.user!.id
    return await this.bookingService.createBooking(authId, createBookingInput)
  }

}
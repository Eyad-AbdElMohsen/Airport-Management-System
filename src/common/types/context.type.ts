import { Request, Response } from 'express';
import { JwtPayload } from './JwtPayload';
import DataLoader from 'dataloader';
import { StaffModel } from 'src/models/staff/staff.entity';
import { BagModel } from 'src/models/bag/bag.entity';
import { BookingModel } from 'src/models/booking/booking.entity';
import { SeatModel } from 'src/models/seat/seat.entity';

export interface GqlContext {
  req: Request;
  res: Response;
  user?: JwtPayload;
  extra?: { user?: JwtPayload };
  loaders: {
    airport: {
      staffLoader: DataLoader<number, StaffModel[]>;
    };
    flight: {
      bagLoader: DataLoader<number, BagModel[]>;
      bookingLoader: DataLoader<number, BookingModel[]>;
    };
    booking: {
      seatLoader: DataLoader<number, SeatModel | null>;
    };
    passenger: {
      bagLoader: DataLoader<number, BagModel[]>;
      bookingLoader: DataLoader<number, BookingModel[]>;
    };
  };
}

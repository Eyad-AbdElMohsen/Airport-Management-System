import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { BagModel } from 'src/models/bag/bag.entity';
import { BookingModel } from 'src/models/booking/booking.entity';

export const createPassenegerLoader = (sequelize: Sequelize) => ({
  bagLoader: new DataLoader<number, BagModel[]>(
    async (passengerIds: number[]) => {
      const bags = await sequelize.getRepository(BagModel).findAll({
        where: { passengerId: { [Op.in]: passengerIds } },
        raw: true,
      });

      const bagMap = new Map<number, BagModel[]>();

      bags.forEach((bag) => {
        if (bagMap.has(bag.passengerId)) {
          bagMap.get(bag.passengerId)!.push(bag);
        } else bagMap.set(bag.passengerId, [bag]);
      });

      return passengerIds.map((id) => bagMap.get(id) || []);
    },
  ),

  bookingLoader: new DataLoader<number, BookingModel[]>(
    async (passengerIds: number[]) => {
      const bookings = await sequelize.getRepository(BookingModel).findAll({
        where: { passengerId: { [Op.in]: passengerIds } },
        raw: true,
      });

      const bookingMap = new Map<number, BookingModel[]>();

      bookings.forEach((booking) => {
        if (bookingMap.has(booking.passengerId)) {
          bookingMap.get(booking.passengerId)!.push(booking);
        } else bookingMap.set(booking.passengerId, [booking]);
      });

      return passengerIds.map((id) => bookingMap.get(id) || []);
    },
  ),
});

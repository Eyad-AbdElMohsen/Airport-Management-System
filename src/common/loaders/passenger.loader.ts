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

      const bagMap: { [id: number]: BagModel[] } = {};

      passengerIds.forEach((id) => (bagMap[id] = []));

      bags.forEach((bag) => {
        bagMap[bag.passengerId].push(bag);
      });

      return passengerIds.map((id) => bagMap[id]);
    },
  ),

  bookingLoader: new DataLoader<number, BookingModel[]>(
    async (passengerIds: number[]) => {
      const bookings = await sequelize.getRepository(BookingModel).findAll({
        where: { passengerId: { [Op.in]: passengerIds } },
        raw: true,
      });

      const staffMap: { [id: number]: BookingModel[] } = {};

      passengerIds.forEach((id) => {
        staffMap[id] = [];
      });

      bookings.forEach((booking) => {
        staffMap[booking.passengerId].push(booking);
      });

      return passengerIds.map((id) => staffMap[id]);
    },
  ),
});

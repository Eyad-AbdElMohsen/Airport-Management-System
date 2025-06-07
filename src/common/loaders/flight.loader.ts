import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { BagModel } from 'src/models/bag/bag.entity';
import { BookingModel } from 'src/models/booking/booking.entity';

export const createFlightLoader = (sequelize: Sequelize) => ({
  bagLoader: new DataLoader<number, BagModel[]>(async (flightIds: number[]) => {
    const bags = await sequelize.getRepository(BagModel).findAll({
      where: { flightId: { [Op.in]: flightIds } },
      raw: true,
    });

    const bagMap: { [id: number]: BagModel[] } = {};

    flightIds.forEach((id) => (bagMap[id] = []));

    bags.forEach((bag) => {
      bagMap[bag.flightId].push(bag);
    });

    return flightIds.map((id) => bagMap[id]);
  }),

  bookingLoader: new DataLoader<number, BookingModel[]>(
    async (flightIds: number[]) => {
      const bookings = await sequelize.getRepository(BookingModel).findAll({
        where: { flightId: { [Op.in]: flightIds } },
        raw: true,
      });

      const staffMap: { [id: number]: BookingModel[] } = {};

      flightIds.forEach((id) => {
        staffMap[id] = [];
      });

      bookings.forEach((booking) => {
        staffMap[booking.flightId].push(booking);
      });

      return flightIds.map((id) => staffMap[id]);
    },
  ),
});

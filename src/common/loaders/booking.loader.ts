import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SeatModel } from 'src/models/seat/seat.entity';

export const createBookingLoader = (sequelize: Sequelize) => ({
  seatLoader: new DataLoader(async (seatIds: number[]) => {
    const seats = await sequelize.getRepository(SeatModel).findAll({
      where: { id: { [Op.in]: seatIds } },
      raw: true, 
    });

    
    const seatMap = new Map<number, SeatModel>();
    seats.forEach((seat) => seatMap.set(seat.id, seat));

    return seatIds.map((id) => seatMap.get(id) ?? null);
  }),
});

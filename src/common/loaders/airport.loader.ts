import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { StaffModel } from 'src/models/staff/staff.entity';

export const createAirportLoader = (sequelize: Sequelize) => ({
  staffLoader: new DataLoader<number, StaffModel[]>(
    async (airportIds: number[]) => {
      const staff = await sequelize.getRepository(StaffModel).findAll({
        where: { airportId: { [Op.in]: airportIds } },
        raw: true,
      });

      const staffMap = new Map<number, StaffModel[]>();

      airportIds.forEach((id) => {
        staffMap[id] = [];
      });

      staff.forEach((s) => {
        staffMap[s.airportId].push(s);
      });

      return airportIds.map((id) => staffMap[id]);
    },
  ),
});

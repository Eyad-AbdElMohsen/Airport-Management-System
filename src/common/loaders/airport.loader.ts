import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AirportModel } from 'src/models/airport/airport.entity';
import { StaffModel } from 'src/models/staff/staff.entity';

export const createAirportLoader = (sequelize: Sequelize) => ({
  staffLoader: new DataLoader<number, StaffModel[]>(
    async (airportIds: number[]) => {
      const staff = await sequelize.getRepository(StaffModel).findAll({
        where: { airportId: { [Op.in]: airportIds } },
        raw: true,
      });

      const staffMap = new Map<number, StaffModel[]>();

      staff.forEach((st) => {
        if (staffMap.has(st.airportId)) staffMap.get(st.airportId)!.push(st);
        else staffMap.set(st.airportId, [st]);
      });

      return airportIds.map((id) => staffMap.get(id) || []);
    },
  ),
});

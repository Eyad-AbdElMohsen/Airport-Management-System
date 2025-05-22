import { Injectable, NotFoundException } from '@nestjs/common';
import { AirportRepo } from './airport.repository';
import { CreateAirportInput } from './gql/createAirport.input';

@Injectable()
export class AirportService {
  constructor(private readonly airportRepo: AirportRepo) {}

  async createAirport(createAirportInput: CreateAirportInput) {
    return (await this.airportRepo.create(createAirportInput)).dataValues;
  }

  async getAirportById(id: number) {
    const airport = await this.airportRepo.getByid(id);
    if (!airport) throw new NotFoundException('Airport not found!');
    return airport;
  }

  async getAllAirports() {
    return await this.airportRepo.getAll();
  }

  async deleteAirport(id: number) {
    const res = await this.airportRepo.delete(id);
    if (!res) throw new NotFoundException('Airport Not Found');
    return { message: 'Passenger Deleted Successfully!' };
  }
}

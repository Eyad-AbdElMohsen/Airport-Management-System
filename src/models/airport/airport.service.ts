import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AirportRepo } from './airport.repository';
import { CreateAirportInput } from './gql/create.input';
import { AirportQueryInput } from './gql/query.input';

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

  async getAllAirports(options: AirportQueryInput) {
    try {
      return await this.airportRepo.getAll(options);
    } catch (err) {
      console.error('Error Getting Airports: ', err);
      throw new HttpException(
        'Filtering Validation Error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteAirport(id: number) {
    const res = await this.airportRepo.delete(id);
    if (!res) throw new NotFoundException('Airport Not Found');
    return { message: 'Passenger Deleted Successfully!' };
  }
}

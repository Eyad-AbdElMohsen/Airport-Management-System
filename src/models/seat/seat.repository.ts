import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SeatModel } from "./seat.entity";


@Injectable()
export class SeatRepo {
    constructor(@InjectModel(SeatModel) private seatModel: typeof SeatModel){}

    async getById(id: number){
        return await this.seatModel.findByPk(id, {raw: true})
    }
}
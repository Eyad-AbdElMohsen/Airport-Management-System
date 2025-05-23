import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWT } from 'src/common/utils/jwt';
import { PlaneModel } from './plane.entity';
import { PlaneService } from './plane.service';
import { PlaneRepo } from './plane.repository';
import { PlaneResolver } from './plane.resolver';

@Module({
  imports: [SequelizeModule.forFeature([PlaneModel])],
  providers: [PlaneService, PlaneRepo, PlaneResolver, JWT],
})
export class PlaneModule {}

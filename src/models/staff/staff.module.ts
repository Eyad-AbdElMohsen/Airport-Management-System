import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffModel } from './staff.entity';
import { StaffResolver } from './staff.resolver';
import { staffRepo } from './staff.repository';
import { StaffService } from './staff.service';
import { JWT } from 'src/common/utils/jwt';

@Module({
  imports: [SequelizeModule.forFeature([StaffModel])],
  providers: [StaffResolver, staffRepo, StaffService, JWT],
})
export class StaffModule {}

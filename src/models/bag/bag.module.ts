import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWT } from 'src/common/utils/jwt';
import { BagModel } from './bag.entity';
import { BagService } from './bag.service';
import { BagResolver } from './bag.resolver';
import { BagRepo } from './bag.repository';
import { SharedModule } from 'src/common/shared/shared.module';

@Module({
  imports: [SequelizeModule.forFeature([BagModel]), SharedModule],
  providers: [BagResolver, BagService, BagRepo, JWT],
})
export class BagModule {}

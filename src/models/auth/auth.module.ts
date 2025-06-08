import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from './auth.entity';
import { AuthResolver } from './auth.resolver';
import { AuthRepo } from './auth.repository';
import { AuthService } from './auth.service';
import { JWT } from 'src/common/utils/jwt';
import { BullQueueModule } from 'src/common/queue/queue.module';

@Module({
  imports: [SequelizeModule.forFeature([AuthModel]), BullQueueModule],
  providers: [AuthResolver, AuthRepo, AuthService, JWT],
  exports: [AuthRepo],
})
export class AuthModule {}

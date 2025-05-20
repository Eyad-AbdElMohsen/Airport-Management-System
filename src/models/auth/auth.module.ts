import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from './auth.entity';
import { AuthResolver } from './auth.resolver';
import { AuthRepo } from './auth.repository';
import { AuthService } from './auth.service';
import { JWT } from 'src/common/utils/jwt';

@Module({
  imports: [SequelizeModule.forFeature([AuthModel])],
  providers: [AuthResolver, AuthRepo, AuthService, JWT],
})
export class AuthModule {}

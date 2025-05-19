import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from './auth.entity';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [SequelizeModule.forFeature([AuthModel])],
  providers: [AuthResolver],
})
export class AuthModule {}

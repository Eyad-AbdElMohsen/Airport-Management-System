import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from './auth.entity';
import { AuthResolver } from './auth.resolver';
import { AuthRepo } from './auth.repository';
import { AuthService } from './auth.service';
import { JWT } from 'src/common/utils/jwt';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([AuthModel]), MailModule],
  providers: [AuthResolver, AuthRepo, AuthService, JWT],
  exports: [AuthRepo]
})
export class AuthModule {}

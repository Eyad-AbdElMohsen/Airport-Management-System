import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JWT } from 'src/common/utils/jwt';
import { BagModel } from './bag.entity';
import { BagService } from './bag.service';
import { BagResolver } from './bag.resolver';
import { BagRepo } from './bag.repository';
import { SharedModule } from 'src/common/shared/shared.module';
import { MailModule } from 'src/common/mail/mail.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([BagModel]),
    SharedModule,
    AuthModule,
    MailModule,
  ],
  providers: [BagResolver, BagService, BagRepo, JWT],
})
export class BagModule {}

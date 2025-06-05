import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { SharedModule } from '../shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SharedModule,
    MailerModule.forRootAsync({
     imports: [ConfigModule],
     inject: [ConfigService],
     useFactory: (async(configService: ConfigService)=> {
        return {
          transport: {
            host: configService.get<string>('EMAIL_HOST'),
            secure: false,
            auth: {
              user: configService.get<string>('EMAIL_USERNAME'),
              pass: configService.get<string>('EMAIL_PASSWORD'),
            }
          }
        }
     })
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {

}



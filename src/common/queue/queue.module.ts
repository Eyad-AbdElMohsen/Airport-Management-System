import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';
import { EmailProcessor } from './queue.worker';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          connection: {
            host: configService.get<string>('REDIS_HOST') || 'localhost',
            port: Number(configService.get<string>('REDIS_PORT')) || 6379,
          },
          defaultJobOptions: {
            attempts: 3, // when fail try again 3 times
            removeOnComplete: 10,
            removeOnFail: 50,
            backoff: 1000, // 1 sec after fail for try again
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: 'Notifications', // queue name
    }),
  ],
  providers: [QueueService, EmailProcessor],
  exports: [QueueService],
})
export class BullQueueModule {}

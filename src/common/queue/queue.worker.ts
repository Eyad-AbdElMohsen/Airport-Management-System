import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from '../mail/mail.service';

@Processor('Notifications')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }
  // Handle the job
  async process(job: Job) {
    console.log(`Processing email job ${job.id} of type ${job.name}`);

    switch (job.name) {
      case 'send-verification-code':
        await this.mailService.sendVerificationCode(
          job.data.email,
          job.data.code,
        );
        break;

      case 'notify-bag-status':
        await this.mailService.notifyPassengerBagStatus(
          job.data.email,
          job.data.bagId,
          job.data.status,
        );
        break;

      case 'notify-flight-status':
        await this.mailService.notifyPassengerFlightStatus(
          job.data.email,
          job.data.flightId,
          job.data.payload,
        );
        break;
    }
  }
  // Job completed
  @OnWorkerEvent('completed')
  onCompleted(job: Job, result: any) {
    console.log(`Job ${job.id} completed with result:`, result);
  }

  // Job failed
  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.error(`Job ${job.id} failed:`, err.message);
  }
}

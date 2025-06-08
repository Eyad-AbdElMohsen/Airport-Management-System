import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('Notifications') private readonly emailQueue: Queue) {}

  async sendVerificationCode(email: string, code: string) {
    await this.emailQueue.add('send-verification-code', { email, code });
  }

  async notifyBagStatus(email: string, bagId: number, status: string) {
    await this.emailQueue.add('notify-bag-status', { email, bagId, status });
  }

  async notifyFlightStatus(
    email: string,
    flightId: number,
    payload: Record<string, any>,
  ) {
    await this.emailQueue.add('notify-flight-status', {
      email,
      flightId,
      payload,
    });
  }
}

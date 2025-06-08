import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationCode(email: string, code: string) {
    await this.mailerService.sendMail({
      from: `Airport Management System`,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}.`,
    });
  }

  async notifyPassengerBagStatus(email: string, bagId: number, status: string) {
    await this.mailerService.sendMail({
      from: `Airport Management System`,
      to: email,
      subject: 'Bag Status Updated',
      html: `<p>Your Bag with id <strong>${bagId}</strong> Status is updated to: <strong>${status}</strong></p>`,
    });
  }

  async notifyPassengerFlightStatus(
    email: string,
    flightId: number,
    payload: any,
  ) {
    await this.mailerService.sendMail({
      from: `Airport Management System`,
      to: email,
      subject: 'Flight Status Updated',
      html: `
      <p>Your flight with id <strong>${flightId}</strong> Status is updated to: </p>
      <ul>
        ${Object.entries(payload).map(([key, val]) => val && `<li><strong>${key}</strong>: ${val}</li>`)} 
      </ul>
      `,
    });
  }
}

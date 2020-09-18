import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

@Injectable()
export class NotificationService {
  constructor(private readonly sendGrid: SendGridService) {}

  async sendMail(toMail: string): Promise<void> {
    await this.sendGrid.send(this.buildMessage(toMail));
  }

  async sendMailMultiply(toEmailList: string[]) {
    await this.sendGrid.send(toEmailList.map((userEmail: string) => {
      return this.buildMessage(userEmail);
    }));
  }

  buildMessage(toMail: string): MailDataRequired {
    return {
      to: toMail, /*кому*/
      from: "sergey@omega-r.com", /*от кого*/
      subject: "Каталог товаров", /*тема*/
      text: "В каталоге появился новый товар", /*сообщение*/
      // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
  }
}
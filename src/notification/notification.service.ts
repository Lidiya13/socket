import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { EmailNotificationOptions } from '../socket-io/interface/email-notification-options';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(private readonly sendGrid: SendGridService,
              private readonly notificationRepository: NotificationRepository) {
  }

  async sendMail(toMail: string): Promise<void> {
    await this.sendGrid.send(this.buildMessage(toMail));
  }

  async sendMailMultiply(emailNotificationOptions: EmailNotificationOptions[]) {
    await Promise.all(emailNotificationOptions.map(async (mailData: EmailNotificationOptions) => {/*для того чтобы дождаться каждый асинх обработчик выполнился*/
      const prepaidMailMessage = this.buildMessage(mailData.email);
      await this.sendGrid.sendMultiple(prepaidMailMessage, (err: Error) => {
        const notificationEntity = this.notificationRepository.create();
        /*if (err) {
          notificationEntity.send = false;
          // записываем в базу, что сообщение не отправилось сохранение в базу добавить
        } else {
          notificationEntity.send = true;
          // записываем в базу, что сообщение успешно отправилось
        }*/
        notificationEntity.send = !err;
        notificationEntity.date = new Date().toISOString();
        this.notificationRepository.save(notificationEntity);
        // Сохраняем дату отправки
      });
    }));
  }

  buildMessage(toMail: string): MailDataRequired {
    return {
      to: toMail, /*кому*/
      from: 'sergey@omega-r.com', /*от кого*/
      subject: 'Каталог товаров', /*тема*/
      text: 'В каталоге появился новый товар', /*сообщение*/
      // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
  }

  getMailList() {
    return this.notificationRepository.find();
  }
}
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { EmailNotificationOptions } from './interface/email-notification-options';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway(3050)
export class SocketIoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly notificationService: NotificationService) {
  }

  private readonly logger = new Logger(SocketIoGateway.name);

  @SubscribeMessage('email_one_notification')
  async subscribeOneEmailNotification(
    @MessageBody() data: EmailNotificationOptions
  ): Promise<void> {
    this.logger.log('Receive email_notification event');
    this.logger.log(data);
    await this.notificationService.sendMail(data.email);
  }

  @SubscribeMessage('email_many_notification')
  async subscribeManyEmailNotification(
    @MessageBody() data: EmailNotificationOptions[]
  ): Promise<void> {
    this.logger.log('Receive email_notification event');
    this.logger.log(data);
    const transformedData = data.map((item: EmailNotificationOptions) => {
      return item.email;
    });
    await this.notificationService.sendMailMultiply(transformedData);
  }

  afterInit(): void {
    this.logger.log('Success init socket server');
  }

  handleConnection(client: Server): void {
    this.logger.log(`Client was connected with id: ${client.id}`);
  }

  handleDisconnect(client: Server): void {
    this.logger.log(`Client was disconnected with id: ${client.id}`);
  }
}
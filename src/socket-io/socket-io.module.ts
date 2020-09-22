import { Module } from '@nestjs/common';
import { SocketIoGateway } from './socket-io.gateway';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [SocketIoGateway],
})
export class SocketIoModule {

}
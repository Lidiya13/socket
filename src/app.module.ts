import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketIoModule } from './socket-io/socket-io.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification/notification.entity';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [SocketIoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'mail',
      entities: [NotificationEntity],
      logging: true,
      synchronize: true,
    }), NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

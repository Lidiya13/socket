import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationRepository } from './notification.repository';

@Module({
  controllers: [NotificationController],
  imports: [TypeOrmModule.forFeature([NotificationRepository]),
    SendGridModule.forRoot({
      apikey: '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',
    }),
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {

}
import { Controller, Get, Param, ParseIntPipe, Post, UploadedFile } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
  }

  @Get()
  getMailList() {
    return this.notificationService.getMailList();
  }
}
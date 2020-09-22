import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsNotEmpty()
  date: string;
  @IsBoolean()
  @IsNotEmpty()
  send: boolean;
}
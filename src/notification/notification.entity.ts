import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_send')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: string;
  @Column()
  send: boolean; /*isSend - все  boolean начитать с is*/
}
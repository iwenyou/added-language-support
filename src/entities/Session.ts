import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User.js';
import { Message } from './Message.js';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.sessions)
  user: User;

  @CreateDateColumn()
  startTime: Date;

  @Column({ type: 'datetime', nullable: true })
  endTime: Date;

  @OneToMany(() => Message, message => message.session)
  messages: Message[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Session } from './Session.js';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Session, session => session.messages)
  session: Session;

  @Column({
    type: 'text',
    enum: ['user', 'assistant']
  })
  role: 'user' | 'assistant';

  @Column('text')
  content: string;

  @CreateDateColumn()
  timestamp: Date;
}
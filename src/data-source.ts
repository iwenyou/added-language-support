import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User.js';
import { Session } from './entities/Session.js';
import { Message } from './entities/Message.js';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Session, Message],
  migrations: [],
  subscribers: []
});
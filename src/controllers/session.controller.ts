import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source.js';
import { Session } from '../entities/Session.js';
import { User } from '../entities/User.js';

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const sessionRepository = AppDataSource.getRepository(Session);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const session = sessionRepository.create({ user });
    await sessionRepository.save(session);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

export const getSessionMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionRepository = AppDataSource.getRepository(Session);
    const session = await sessionRepository.findOne({
      where: { id: req.params.id },
      relations: ['messages'],
      order: { messages: { timestamp: 'ASC' } }
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session.messages);
  } catch (error) {
    next(error);
  }
};
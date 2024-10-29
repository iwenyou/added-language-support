import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Message } from '../entities/Message';
import { Session } from '../entities/Session';

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId, content, role } = req.body;
    const sessionRepository = AppDataSource.getRepository(Session);
    const messageRepository = AppDataSource.getRepository(Message);

    const session = await sessionRepository.findOneBy({ id: sessionId });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const message = messageRepository.create({
      session,
      content,
      role
    });

    await messageRepository.save(message);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};
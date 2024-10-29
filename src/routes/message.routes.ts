import { Router } from 'express';
import { createMessage } from '../controllers/message.controller';
import { validateMessage } from '../middleware/validation.middleware';

export const messageRouter = Router();

messageRouter.post('/', validateMessage, createMessage);
import { Router } from 'express';
import { createSession, getSessionMessages } from '../controllers/session.controller';

export const sessionRouter = Router();

sessionRouter.post('/', createSession);
sessionRouter.get('/:id/messages', getSessionMessages);
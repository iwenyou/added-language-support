import { Router } from 'express';
import { createUser, getUser } from '../controllers/user.controller';
import { validateUser } from '../middleware/validation.middleware';

export const userRouter = Router();

userRouter.post('/', validateUser, createUser);
userRouter.get('/:id', getUser);
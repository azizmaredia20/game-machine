import { Router } from 'express';
import { login, logout, register } from '../controllers';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.post('/register', register);

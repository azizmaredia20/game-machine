import { Router } from 'express';
import { game } from '../controllers';

export const gameRouter = Router();

gameRouter.post('/game', game);

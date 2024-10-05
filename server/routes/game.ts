import { Router } from 'express';
import { readGameData, readGameDataByMachine, postGameData } from '../controllers';

export const gameRouter = Router();

gameRouter.get('/game', readGameData);
gameRouter.get('/game/:machineNo', readGameDataByMachine);
gameRouter.post('/game', postGameData);

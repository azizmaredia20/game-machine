import { Router } from 'express';
import { authorize } from 'server/passport';
import { readGameData, readGameDataByMachine, updateGameDataByMachine, postGameData } from '../controllers';

export const gameRouter = Router();

gameRouter.use('/game', authorize);
gameRouter.get('/game', readGameData);
gameRouter.get('/game/:machineNo', readGameDataByMachine);
gameRouter.put('/game/:machineNo', updateGameDataByMachine);
gameRouter.post('/game', postGameData);

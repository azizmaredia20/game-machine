import { Router } from 'express';
import { authorizeAdmin } from '../passport';
import { postGameRoomData, readGameRoomData } from '../controllers';

export const gameRoomRouter = Router();

gameRoomRouter.post('/gameroom', authorizeAdmin, postGameRoomData);
gameRoomRouter.get('/gameroom', readGameRoomData);
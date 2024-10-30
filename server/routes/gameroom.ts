import { Router } from 'express';
import { authorizeAdmin } from '../passport';
import { postGameRoomData } from '../controllers';

export const gameRoomRouter = Router();

// gameRoomRouter.use('/gameroom', authorizeAdmin);
gameRoomRouter.post('/gameroom', postGameRoomData);

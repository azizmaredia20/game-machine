import { Router } from 'express';
import { postVerifyData } from '../controllers';

export const verifysRouter = Router();

verifysRouter.post('/verify', postVerifyData);

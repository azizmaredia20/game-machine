import { Router } from 'express';
import { readExpensesDataByShift, postExpensesData } from '../controllers';

export const expensesRouter = Router();

expensesRouter.get('/expenses/:shiftNo', readExpensesDataByShift);
expensesRouter.post('/expenses', postExpensesData);

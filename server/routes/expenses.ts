import { Router } from 'express';
import { authorize } from 'server/passport';
import { readExpensesDataByShift, postExpensesData } from '../controllers';

export const expensesRouter = Router();

expensesRouter.use('expenses', authorize);
expensesRouter.get('/expenses/:shiftNo', readExpensesDataByShift);
expensesRouter.post('/expenses', postExpensesData);

import { Router } from 'express';
import { login, logout, register, getUserData } from '../controllers';
import { authorizeAdmin } from '../passport';
import { SECRET_TOKEN } from '../config';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/user', getUserData);
authRouter.get('/user/:userId', getUserData);
authRouter.get('/logout', logout);
authRouter.post('/register', authorizeAdmin, register);

authRouter.post('/register-first-user', (req, res, next) => {
  const queryParam = req.query.adminKey;

  if (queryParam !== SECRET_TOKEN ) {
    res.status(409).json({
      message: 'Invalid Secret Key to register the first admin user'
    });
  }
  next();
}, register);

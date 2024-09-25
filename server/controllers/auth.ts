import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModal from '../model/user';
import { SALT_ROUNDS, COOKIE_JWT_KEY, SECRET_TOKEN } from '../config';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response<object>> => {
  try {
    const userExists = await UserModal.findOne({ username: req?.body?.username });

    if (!userExists) {
      return res.status(401).json({ message: 'User does not exist. Please reach out to administrator' });
    }

    // check if password is correct
    const match = await bcrypt.compare(req?.body?.password, userExists.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
      
    // generate access token
    const accessToken = jwt.sign(
      {
        sub: userExists._id,
        username: userExists.username,
        role: userExists.role
      },
      SECRET_TOKEN,
      { expiresIn: "1d" }
    );

    return res
      .cookie(COOKIE_JWT_KEY, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json({ message: 'Logged in successfully' });
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Not able to Log In.' });
  }
}

export const register = async (req: Request, res: Response): Promise<Response<object>> => {  
  try {
    const user = await UserModal.create({
      username: req?.body?.username,
      password: await bcrypt.hash(req?.body?.password, SALT_ROUNDS),
      role: req?.body?.role,
    });``

    return res.status(201).json({
      message: "user created",
      user: { username: user.username, id: user._id },
    })

  } catch(err: any) {
    console.error(`Failed to register the user with error - ${err}`);

    return res.status(409).json({
      message: `Unable to register the user - ${err}`
    }); 
  }
}
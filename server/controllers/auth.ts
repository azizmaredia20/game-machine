import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModal from '../model/user';
import { SALT_ROUNDS, COOKIE_JWT_KEY, SECRET_TOKEN } from '../config';

export const login = async (req: Request, res: Response): Promise<Response<object>> => {
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
      .json({ message: 'Logged in successfully', user: userExists });
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Not able to Log In.' });
  }
}

export const logout = async (req: Request, res: Response): Promise<Response<object>> => {
  try {
    return res
      .clearCookie(COOKIE_JWT_KEY)
      .status(200)
      .json({ message: 'Log out successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Not able to Log out.' });
  }
}

export const register = async (req: Request, res: Response): Promise<Response<object>> => {  
  try {
    const user = await UserModal.create({
      username: req?.body?.username,
      password: await bcrypt.hash(req?.body?.password, SALT_ROUNDS),
      role: req?.body?.role,
      stores: req?.body?.stores
    });

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

export const getUserData = async (req: Request, res: Response): Promise<Response<object>> => {
  const userId = req.params.userId;
  const authToken = req.cookies[COOKIE_JWT_KEY];
  let user = null;

  if (userId) {
    user = await UserModal.findOne({ _id: userId });
  } else if (authToken) {
    const claims = jwt.verify(authToken, SECRET_TOKEN);

    console.log(authToken, claims);
  }

  return res.status(200).json({
    user
  });
}
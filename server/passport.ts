import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy } from "passport-jwt";
import UserModel from "./model/user";
import { ADMIN, COOKIE_JWT_KEY, SECRET_TOKEN, USER } from "./config";

export type User = {
  sub: string,
  username: string,
  password: string,
  role: string
};

const cookieExtractor = function(req: Request) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies[COOKIE_JWT_KEY];
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: SECRET_TOKEN,
};

passport.use(
  new Strategy(opts, async (payload: any, done: any) => {
    try {
      const user = await UserModel.findById(payload.sub);
      if (user) {
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  })
);

export const authorizeAdmin = (req: Request, res: Response<User | object>, next: NextFunction) => {
  passport.authenticate("jwt", (err: any, user: User, info: { message: string }) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: 'User is not authenticated!',
      });
    }

    if (user.role !== ADMIN) {
      return res.status(401).json({
        message: `User with role ${user.role} is not authorized`,
      });
    }
  
    res.locals.user = user;
    next();
  })(req, res, next);
};

export const authorize = (req: Request, res: Response<User | object>, next: NextFunction) => {
  passport.authenticate("jwt", (err: any, user: User, info: { message: string }) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: 'User is not authenticated!',
      });
    }

    res.locals.user = user;
    next();
  })(req, res, next);
};

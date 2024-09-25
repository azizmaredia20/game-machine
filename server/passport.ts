import { Request, Response, NextFunction } from "express";
import { Strategy } from "passport-jwt";
import passport, { payload } from "passport";
import UserModel from "./model/user";
import { COOKIE_JWT_KEY, SECRET_TOKEN } from "./config";

import { User } from "./app";

const cookieExtractor = function(req) {
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
  new Strategy(opts, async (payload, done) => {
    try {
      const user = UserModel.findById(payload.sub);
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

const authorize = (req: Request, res: Response<User>, next: NextFunction) => {
  passport.authenticate("jwt", (err: any, user: User, info: { message: string }) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        statusode: 401,
        message: 'User is not authenticated!',
      });
    }
  
    res.locals.user = user;
    next();
  })(req, res, next);
};

export default authorize;

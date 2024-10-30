import { Router } from 'express';
import mongoose from "mongoose";
import { authRouter, gameRouter, expensesRouter, verifysRouter, gameRoomRouter } from './routes';

const apiRouter = Router();
apiRouter.use(authRouter);
apiRouter.use(gameRouter);
apiRouter.use(expensesRouter);
apiRouter.use(verifysRouter);
apiRouter.use(gameRoomRouter);

export function connectDB(): void {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gameAccounting?directConnection=true&serverSelectionTimeoutMS=2000"

  try {
    mongoose.connect(MONGO_URI);
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log(`Database connected: ${MONGO_URI}`);
  });
 
  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });

  dbConnection.on("close", (err) => {
    console.log(`Database connected closed on url: ${MONGO_URI}`);
  });
}

export default apiRouter;
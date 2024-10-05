import { Router } from 'express';
import mongoose from "mongoose";
import { authRouter, gameRouter, expensesRouter } from './routes';

const apiRouter = Router();
apiRouter.use(authRouter);
apiRouter.use(gameRouter);
apiRouter.use(expensesRouter);

export function connectDB(): void {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/gambling"

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
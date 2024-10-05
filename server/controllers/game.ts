import { Request, Response, NextFunction } from "express";
import GameModel from "../model/game";

export const readGameData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<object>> => {
  const queryParams = req.query;
  try {
    const result = await GameModel.find(queryParams).exec();

    return res.status(200).json(result);
  } catch (e) {
    const message = `Failed to load data with searchParms ${JSON.stringify(
      queryParams
    )} - ${e}`;
    console.error(message);

    return res.status(500).json({
      message,
    });
  }
};

export const readGameDataByMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<object>> => {
  const machineNo = req.params.machineNo;
  const queryParams = req.query;

  try {
    const result = await GameModel.find({
      machineNo: parseInt(machineNo),
      ...queryParams,
    }).exec();

    return res.status(200).json(result);
  } catch (e) {
    const message = `Failed to read data for machine ${machineNo} - ${e}`;
    console.error(message);

    return res.status(500).json({
      message,
    });
  }
};

export const postGameData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<object>> => {
  const gameData = req?.body;
  const { machineNo } = gameData;

  try {
    
    const user = await GameModel.create(gameData);

    return res.status(200).json({
      machineNo,
      message: `Sucessfully saved data for machine ${machineNo}.`,
    });
  } catch (err: any) {
    console.error(`Failed to save data for Machine ${machineNo} - ${err}`);

    return res.status(500).json({
      message: `Failed to save data for Machien ${machineNo} - ${err}`,
    });
  }
};

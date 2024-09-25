import { Request, Response, NextFunction } from 'express';
import GameModel from '../model/game';

export const game = async (req: Request, res: Response, next: NextFunction): Promise<Response<object>> => {
  const gameData = req?.body;
  const { machineNo } = gameData;
  console.log('GameData', { ...gameData });

  try {
    const user = await GameModel.create({
      storeName: 'someStore',
      ...gameData
    });

    return res.status(200).json({
      machineNo,
      message: `Sucessfully saved for data for machine ${machineNo}.`
    })

  } catch(err: any) {
    console.error(`Failed to save data for Machine ${machineNo} - ${err}`);

    return res.status(500).json({
      message: `Unable to save data for Machien ${machineNo} - ${err}`
    }); 
  }











  return res.status(200)
  .send({ message: "SUCCESSFULLY Data saved" });
}
import { Request, Response } from "express";
import GameRoomModel from "../model/gameroom";

export interface createGameRoomFormData {
  gameRoom: {
    label: string;
    value: string, 
  },
  totalMachines: number,
}

export const postGameRoomData = async (
  req: Request,
  res: Response,
): Promise<Response<object>> => {
  const gameRoomData: createGameRoomFormData = req?.body;
  try {
    const user = await GameRoomModel.create(gameRoomData);

    return res.status(200).json({
      message: `Sucessfully saved game room ${gameRoomData?.gameRoom?.label}.`,
    });
  } catch (err: any) {
    const message = `Failed to save game room ${gameRoomData?.gameRoom?.label} - ${err}`;
    console.error(message);

    return res.status(500).json({ message });
  }
};
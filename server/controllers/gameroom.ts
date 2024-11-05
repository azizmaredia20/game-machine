import { Request, Response } from "express";
import GameRoomModel from "../model/gameroom";

export interface createGameRoomFormData {
  label: string;
  value: string;
  totalMachines: number;
  shifts: number;
}

export const postGameRoomData = async (
  req: Request,
  res: Response,
): Promise<Response<object>> => {
  const gameRoomData: createGameRoomFormData = req?.body;
  try {
    const user = await GameRoomModel.create(gameRoomData);

    return res.status(200).json({
      message: `Sucessfully saved game room ${gameRoomData?.label}.`,
    });
  } catch (err: any) {
    const message = `Failed to save game room ${gameRoomData?.label} - ${err}`;
    console.error(message);

    return res.status(500).json({ message });
  }
};

export const readGameRoomData = async (
  req: Request,
  res: Response,
): Promise<Response<object>> => {
  try {
    const gameRoomData = await GameRoomModel.find({}).select({ "__v": 0, "_id": 0 });

    return res.status(200).json(gameRoomData);
  } catch (err: any) {
    const message = `Failed to read game room data - ${err}`;

    console.error(message);
    return res.status(500).json({ message });
  }
};
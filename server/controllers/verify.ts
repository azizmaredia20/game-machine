import { Request, Response, NextFunction } from "express";
import VerifyModel from "../model/verify";

export const postVerifyData = async (
  req: Request,
  res: Response
): Promise<Response<object>> => {
  const verifyData = req?.body;

  try {
    const expenses = await VerifyModel.create(verifyData);

    return res.status(200).json({
      message: `Verification data saved successfully.`,
    });
  } catch (err: any) {
    const message = 'Failed to save verification data';
    console.error(message);

    return res.status(500).json({message});
  }
};

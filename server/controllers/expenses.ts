import { Request, Response, NextFunction } from "express";
import ExpenselModal from "../model/expense";


export const readExpensesDataByShift = async (
  req: Request,
  res: Response
): Promise<Response<object>> => {
  const shiftNo = req.params.shiftNo;
  const queryParams = req.query;

  try {
    const result = await ExpenselModal.find({
      shiftNo: parseInt(shiftNo),
      ...queryParams,
    }).exec();

    return res.status(200).json(result);
  } catch (e) {
    const message = `Failed to read data for shift ${shiftNo} - ${e}`;

    return res.status(500).json({
      message,
    });
  }
};

export const postExpensesData = async (
  req: Request,
  res: Response
): Promise<Response<object>> => {
  const expenseData = req?.body;
  const { shiftNo } = expenseData;
  
  try {
    const expenses = await ExpenselModal.create(expenseData);

    return res.status(200).json({
      shiftNo,
      message: `Sucessfully saved data for shift ${shiftNo}.`,
    });
  } catch (err: any) {
    console.error(`Failed to save data for shift ${shiftNo} - ${err}`);

    return res.status(500).json({
      message: `Failed to save data for shift ${shiftNo} - ${err}`,
    });
  }
};

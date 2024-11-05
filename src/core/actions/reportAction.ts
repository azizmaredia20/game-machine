import { DailyReportTableRow } from "@screens/Report/DailyReport";
import { callApi, formatDate, getPastDate } from "@utils/index";
import { GameFormData } from "./gameAction";

const parseDailReportData = ([previousDayData, todaysData]: GameFormData[][]) => {
  console.log(previousDayData, todaysData); 

  return todaysData.map((machineData, idx) => {
    const previousIn = previousDayData[idx]?.currentIn as number;
    const previousOut = previousDayData[idx]?.currentOut as number;
    const currentIn = machineData?.currentIn as number;
    const currentOut = machineData?.currentOut as number;
    const dailyIn = currentIn - previousIn;
    const dailyOut = currentOut - previousOut;

    return {
      machineNo: machineData?.machineNo,
      previousIn,
      previousOut,
      currentIn,
      currentOut,
      dailyIn,
      dailyOut,
      profit: (dailyOut - dailyIn),
    };
  })

}

export const getDailReportData = async (selectedGameRoom: string, date: string): Promise<DailyReportTableRow[]> => {
  try {
    const previousDate = formatDate(getPastDate(new Date(date), 1));
    const todayParams = new URLSearchParams({ storeName: selectedGameRoom, date });
    const prevDayParams = new URLSearchParams({ storeName: selectedGameRoom, date: previousDate });

    console.log(date, todayParams.toString(), prevDayParams.toString());

    const previousDayCall = callApi(`api/game?${prevDayParams.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });
    const todaysCall = callApi(`api/game?${todayParams.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });
    const dailyReportData = await Promise.all([previousDayCall, todaysCall]) as GameFormData[][];

    return parseDailReportData(dailyReportData);
  } catch(e) {
    const message = `Failed to retrieve app context data - ${e}`;
    console.log(message);
    return [];
  }
}
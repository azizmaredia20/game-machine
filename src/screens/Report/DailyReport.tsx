import React, { useState } from "react";
import appContext from "@hooks/useAppContext";
import { formatDate } from "@utils/index";
import Datepicker from "@core/components/Form/Datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDailReportData } from "@core/actions";

export interface DailyReportTableRow {
  machineNo: number;
  previousIn: number;
  previousOut: number;
  currentIn: number;
  currentOut: number;
  dailyIn: number;
  dailyOut: number;
  profit: number;
}

const TABLE_HEADERS = [
  "Machine No",
  "Previous In",
  "Previous Out",
  "Current In",
  "Current Out",
  "Daily In",
  "Daily Out",
  "Profit",
];

const DailyReport: React.FC<DailyReportProps> = (_props) => {
  const { appState } = appContext();
  const [tableData, setTableData] = useState<DailyReportTableRow[]>([]);

  const handleDateChange = async ({ value }) => {
    console.log("handleDateChange", value);
    setTableData(
      await getDailReportData(
        appState?.selectedGameRoom?.value as string,
        value
      )
    );
  };

  return (
    <div className="font-[sans-serif] my-8 mx-4 grid">
      <Datepicker
        className="py-2 w-auto mx-auto"
        label="Select Date"
        labelClassName="text-gray-800 text-sm mb-2"
        name="date"
        defaultValue={new Date()}
        onChange={handleDateChange}
      />

      {tableData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white mt-4">
            <thead className="bg-gray-300 whitespace-nowrap">
              <tr>
                {TABLE_HEADERS.map((header, ind) => (
                  <th
                    key={(ind + 1).toString()}
                    className="p-4 text-left text-sm font-medium text-gray-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {tableData.map((row, idx) => (
                <tr className="even:bg-blue-50" key={row.machineNo}>
                  <td className="p-4 text-sm text-black">{row.machineNo}</td>
                  <td className="p-4 text-sm text-black">{row.previousIn}</td>
                  <td className="p-4 text-sm text-black">{row.previousOut}</td>
                  <td className="p-4 text-sm text-black">{row.currentIn}</td>
                  <td className="p-4 text-sm text-black">{row.currentOut}</td>
                  <td className="p-4 text-sm text-black">{row.dailyIn}</td>
                  <td className="p-4 text-sm text-black">{row.dailyOut}</td>
                  <td className="p-4 text-sm text-black">{row.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

interface DailyReportProps {
  [key: string]: any;
}

export default DailyReport;

import { createContext, useContext, useState } from "react";
import { useMemo } from "react";
import { COMPANY_START_DATE } from "@/constants";
import { DateTime } from "luxon";

const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const montIndexes = monthShortNames.keys();
type Month = {
  monthName: (typeof monthShortNames)[number];
  year: number;
  monthIndex: number;
  yearMonth: `${Month["year"]} ${Month["monthName"]}`;
  start: number;
  end: number;
  includes: (date: Date | string) => boolean;
};

const getMonths = () => {
  let months: Month[] = [];
  const today = new Date();
  // this loops from current year and current month back to company start date.
  for (let y = today.getFullYear(); y >= COMPANY_START_DATE.getFullYear(); y--) {
    let monthStartIndex = 11;
    if (y === today.getFullYear()) monthStartIndex = today.getMonth(); // if its current year, start from current month.
    for (let monthIndex = monthStartIndex; monthIndex >= 0; monthIndex--) {
      let monthStartISOString = `${y}-${String(monthIndex).padStart(2, "0")}-26T00:00:00.000`;
      let monthEndISOString = `${y}-${String(monthIndex + 1).padStart(2, "0")}-25T23:59:59.999`;

      if (monthIndex === 0) monthStartISOString = `${y - 1}-12-26T00:00:00.000`;
      if (monthIndex === 0) monthEndISOString = `${y}-01-25T23:59:59.999`;

      // if (monthIndex === 11) monthStartISOString = `${y}-11-26T00:00:00.000`;
      // if (monthIndex === 11) monthEndISOString = `${y}-12-25T23:59:59.999`;

      const monthStartDate = DateTime.fromISO(monthStartISOString, { zone: "Asia/Tehran" }).toJSDate();
      const monthEndDate = DateTime.fromISO(monthEndISOString, { zone: "Asia/Tehran" }).toJSDate();

      const monthObj: Month = {
        monthName: monthShortNames[monthIndex],
        year: y,
        monthIndex: monthIndex,
        yearMonth: `${y} ${monthShortNames[monthIndex]}`,
        start: monthStartDate.getTime() as number,
        end: monthEndDate.getTime() as number,
        includes: function (date: string | Date) {
          if (typeof date === "string" && isNaN(Date.parse(date))) {
            throw new Error("Invalid date");
          }
          let theDate = typeof date === "string" ? new Date(date) : date;
          const time = theDate.getTime();
          return time >= this.start && time < this.end;
        },
      };
      months.push(monthObj);
    }
  }
  return months;
};

const initialMonths = getMonths();
export const MonthContext = createContext({ months: initialMonths });

const MonthsProvider = ({ children }: { children?: React.ReactNode }) => {
  const months = useMemo(getMonths, []);
  return <MonthContext.Provider value={{ months }}>{children}</MonthContext.Provider>;
};

export default MonthsProvider;

export const useMonths = () => {
  const { months } = useContext(MonthContext);
  return months;
};
//   const time = theDate.getTime();
//   return time >= m.start && time < m.end;
// };

// export const isInMonth = (date: string | Date, m) => {
//   if (!date || date === "") return null;

//   let theDate = typeof date === "string" ? new Date(date) : date;

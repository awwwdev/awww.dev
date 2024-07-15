import { createContext, useContext, useState } from "react";

const availableTimeZones = ["Asia/Tehran", "America/Toronto"];
export const TimeZoneContext = createContext({
  availableTimeZones,
  timeZone: "Asia/Tehran",
  setTimeZone: (timeZone: TimeZone) => {},
});

export type TimeZone = (typeof availableTimeZones)[number];
const TimeZoneProvider = ({ children }: { children?: React.ReactNode }) => {
  const [timeZone, setTimeZone] = useState<TimeZone>("Asia/Tehran");
  return (
    <TimeZoneContext.Provider value={{ timeZone, setTimeZone, availableTimeZones }}>
      {children}
    </TimeZoneContext.Provider>
  );
};

export default TimeZoneProvider;

export const useTimeZone = () => {
  const { timeZone, setTimeZone, availableTimeZones } = useContext(TimeZoneContext);
  return { timeZone, setTimeZone, availableTimeZones };
};

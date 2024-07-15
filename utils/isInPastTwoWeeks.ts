import months from "./helpers/getWorkingMonths";

export default function isInPastTwoWeeks(theDate) {
  let date = theDate;
  if (typeof date === "string") date = new Date(theDate);

  const now = new Date();
  const twoWeeksBefore = new Date(now.getDate() - 14);

  return now.getTime() > date.getTime() && date.getTime() >= twoWeeksBefore.getTime();
}

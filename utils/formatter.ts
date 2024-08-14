import { TimeZone } from "@/components/TimeZoneProvider";
// import { z } from "zod";

export const frmCAD = (x) => Math.round(x * 100) / 100;
export const frmPercentage = (x) => Math.round(x * 100);
export const frmCamelCase = (str) => {
  if (!str || str.trim() === "") return str;

  const cap = str.charAt(0).toUpperCase() + str.slice(1);

  const strArr = cap.split("");
  const res = strArr.map((ch, i) => {
    if (i < strArr.length - 1 && isUpperCase(strArr[i + 1])) return `${ch} `;
    return ch;
  });
  return res.join("");
};

const isUpperCase = (char) => char.toUpperCase() === char;

type Props = {
  children: any[];
  // hasTotalRow?: boolean;
  // hasAverageRow?: boolean;
};

export const toReadableMonth = (date: string | Date, timeZone?: TimeZone) => {
  const monthFormatter = new Intl.DateTimeFormat("en-CA", {
    // dateStyle: 'full',
    // timeStyle: 'long',
    month: "short",
    year: "numeric",
    timeZone: "Asia/Tehran",
  });

  if (!date) return "";
  if (typeof date === "string" && date.trim() === "") return "";
  return monthFormatter.format(date instanceof Date ? date : new Date(date));
};

export const getFullName = (user) => `${user?.firstname} ${user?.lastname}`;
export const getFullNameFa = (user) => `${user?.firstnameFa} ${user?.lastnameFa}`;

export const getUserRoles = (user) => {
  const roles = [];
  if (user.admin) roles.push("Admin");
  if (user.teacher) roles.push("Teacher");
  if (user.payer) roles.push("Payer");
  if (user.student) roles.push("Student");

  return roles.join(", ") || "No Role";
};

export const deCamel = (str) => {
  if (!str || str.trim() === "") return str;

  const cap = str.charAt(0).toUpperCase() + str.slice(1);

  const strArr = cap.split("");
  const res = strArr.map((ch, i) => {
    if (i < strArr.length - 1 && isUpperCase(strArr[i + 1])) return `${ch} `;
    return ch;
  });
  return res.join("");
};

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
export function getRelativeTimeString(date: Date | number, lang = 'en'): string {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

export const toReadableDate = (date: string | Date, timeZone?: TimeZone) => {

  if (!(date instanceof Date) && !z.string().datetime().safeParse(date)) return "Invalid Date";
  if (!date) return "";
  if (typeof date === "string" && date.trim() === "") return "";
  
  const d = date instanceof Date ? date : new Date(date);
  const currentDate = new Date();
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateFormatter = new Intl.DateTimeFormat("en-CA", {
      month: "short",
      day: "numeric",
      year: d.getFullYear() === currentDate.getFullYear() ? undefined : "numeric",
      timeZone: clientTimeZone
    });
    return dateFormatter.format(d);
};

export const toRelativeOrReadableDate = (date: number | Date, timeZone?: TimeZone, lang ='en') => {
  let d: Date;
  if (date instanceof Date) d = date;
  if (typeof date === "string" || typeof date === 'number') d = new Date(date);
  // Allow dates or times to be passed
  const timeMs = d.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const miliSecondsInAWeek = 60 * 60 * 24 * 7;
  if (Math.abs(deltaSeconds) <= miliSecondsInAWeek) {
    return getRelativeTimeString(d, lang);
  }
  return toReadableDate(d);
};

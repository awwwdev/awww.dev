import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function calcPackageCost(SelectedCourse, numberOfSessions) {
  let sessionCalculatedCost = null;
  let normalSessionCost = null;
  let durationFactor = null;
  let studentCountFactor = null;
  let sessionsCountFactor = null;
  let sessionDurationOnWebsite = null;
  let requestedDuration = null;
  let studentsCount = null;
  let numberOfStudents = null;
  let sessionsCount = null;
  const sessionsCountMap = {
    1: 1.15,
    10: 0.95,
    13: 0.95,
    15: 0.95,
    20: 0.95,
  };

  normalSessionCost = SelectedCourse.teacher.expertise[0].sessionPriceInCAD;
  sessionDurationOnWebsite = SelectedCourse.teacher.expertise[0].sessionDurationOnWebsiteInMinute;
  requestedDuration = SelectedCourse.requestedSessionDurationInMinute;
  studentsCount = SelectedCourse.courseStudent.length;
  numberOfStudents = SelectedCourse.numberOfStudents;
  sessionsCount = numberOfSessions;
  sessionsCountFactor = sessionsCountMap[sessionsCount] ?? 1;
  durationFactor = requestedDuration ? requestedDuration / sessionDurationOnWebsite : 1;
  studentCountFactor = ((studentsCount - 1) * 0.2 + 1) * (studentsCount / numberOfStudents);
  sessionCalculatedCost = sessionsCountFactor * durationFactor * studentCountFactor * normalSessionCost * sessionsCount;

  return sessionCalculatedCost;
}

export function checkCouponStatus(couponData, userInfo) {
  const now = new Date();
  const dateTimeString = now.toISOString().substring(0, 16);
  let result = { amount: 0, percentage: 0, message: "" };
  if (couponData.length === 0) {
    result.message = "Coupon not found";
    return result;
  }
  if (couponData[0].condition.validFrom > dateTimeString) {
    result.message = "Coupon is not valid yet";
    return result;
  }
  if (
    couponData[0].condition.usedCount >= couponData[0].condition.maxUse ||
    couponData[0].condition.validTo < dateTimeString
  ) {
    result.message = "Coupon is expired";
    return result;
  }
  if (couponData[0].condition.userId.length > 0 && !couponData[0].condition.userId.includes(userInfo.payer.id)) {
    result.message = "Coupon is not valid for you";
    return result;
  }
  if (couponData[0].condition.usedUser.includes(userInfo.payer.id)) {
    result.message = "You already used this coupon";
    return result;
  }
  if (
    couponData[0].condition.categoryId.length > 0 &&
    !couponData[0].condition.categoryId.includes(userInfo.categoryId)
  ) {
    result.message = "Coupon is not valid for this category";
    return result;
  }
  if (couponData[0].condition.topicId.length > 0 && !couponData[0].condition.topicId.includes(userInfo.topicId)) {
    result.message = "Coupon is not valid for this topic";
    return result;
  }
  if (couponData[0].condition.teacherId.length > 0 && !couponData[0].condition.teacherId.includes(userInfo.teacherId)) {
    result.message = "Coupon is not valid for this teacher";
    return result;
  }
  // If the coupon is valid, set the amount or percentage and message
  if (couponData[0].condition.amount > 0) {
    result.amount = couponData[0].condition.amount;
  } else {
    result.percentage = couponData[0].condition.percentage;
  }
  result.message = "Coupon is valid";
  console.log(result);
  return result;
}

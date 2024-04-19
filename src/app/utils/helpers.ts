import bcrypt from "bcrypt";
import { ZodFieldError } from "../types";

export function getTimeToDeadline(
  startDate: Date | string,
  deadline: Date | string
): string {
  // minus startDate from deadline to get remaining time in days or hours
  const timeToDeadline: string = "4days";
  return timeToDeadline;
}


// safely parse json string or return false if not valid
export function parseJSON<T>(jsonString: string): T | false {
  try {
    const value = JSON.parse(jsonString);
    return value as T
  } catch (err) {
    return false
  }
}




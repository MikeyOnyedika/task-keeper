import bcrypt from "bcrypt";

export function getTimeToDeadline(
  startDate: Date | string,
  deadline: Date | string
): string {
  // minus startDate from deadline to get remaining time in days or hours
  const timeToDeadline: string = "4days";
  return timeToDeadline;
}


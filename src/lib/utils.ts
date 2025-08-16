import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// We use this function to format the date to string
// We cannot use toISOString() function on the date because it does a formatting
export function formatLocalDate(dateStr: Date) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// We use this function to get the hour difference between two specific dates with their time
export function getHoursDifference(startDate: string, startTime: string, endDate: string, endTime: string): number {
  // I Combine date and time into full strings like ISO strings
  const startDateTimeStr = `${startDate}T${startTime}`;
  const endDateTimeStr   = `${endDate}T${endTime}`;

  // Create Date objects
  const start = new Date(startDateTimeStr);
  const end   = new Date(endDateTimeStr);

  // Difference in milliseconds and hours
  const diffMs = end - start;
  const diffHours = diffMs / (1000 * 60 * 60);

  return diffHours;
}
import handleFileUploads from "@/server-actions/handleFileUploads";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// We use this function to format the date to string
// We cannot use toISOString() function on the date because it does a formatting
export function formatLocalDate(dateStr: Date) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// We use this function to get the hour difference between two specific dates with their time
export function getHoursDifference(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): number {
  // I Combine date and time into full strings like ISO strings
  const startDateTimeStr = `${startDate}T${startTime}`;
  const endDateTimeStr = `${endDate}T${endTime}`;

  // Create Date objects
  const start = new Date(startDateTimeStr);
  const end = new Date(endDateTimeStr);

  // Difference in milliseconds and hours
  const diffMs = +end - +start;
  const diffHours = diffMs / (1000 * 60 * 60);

  return diffHours;
}

export async function uploadFiles(files: (File | string)[]) {
  
  // Upload images to R2 and get URLs
  // I use Promise.all to upload all files concurrently
  // This will return an array of URLs for the uploaded files

  return await Promise.all(
    files.map(async (file: File | string) => {
      // We check for uploaded files that are just strings and handle them seperately from files that we just want to be uploaded
      if (typeof file === "string") {
        return file; // If it's already a URL, we just return it
      }
      const res = await handleFileUploads(file.name, file.size, file.type);
      // If there's an error, we show a toast
      if (res.error) {
        toast.error(res.error, {
          classNames: {
            toast: "!text-red-500",
            title: "!text-red-500",
            description: "!text-red-500",
          },
        });
        return false;
      }

      // If there is an error, or if the presigned URL or file name is not returned, we return early
      // This is to ensure that we do not try to upload the file if the presigned URL is not valid
      if (res.error || !res.presignedUrl || !res.fileName) return false;

      // Destructure the presignedUrl and fileName from the response
      const { presignedUrl, fileName } = res;

      // Upload the file to the presigned URL
      // This will return a response from the server, but we do not need to use it
      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      // Return the file name, which is the URL of the uploaded file
      return fileName; // Save only the final URL
    })
  );
}

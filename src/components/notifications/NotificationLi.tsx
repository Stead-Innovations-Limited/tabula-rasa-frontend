import { Notification } from "@/lib/types";
import { formatDistanceToNowStrict } from "date-fns";

export function formatRelativeTime(date: string | Date): string {
  const time = formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
  });

  // We handle edge case for "0 seconds ago"
  if (time === "0 seconds ago") return "Now";

  // We replace about, less than, almost, over for an empty character
  const cleaned = time
    .replace("about ", "")
    .replace("less than ", "")
    .replace("almost ", "")
    .replace("over ", "");

  // We abbreviate the time to make it more readable
  // e.g., "2 minutes ago" becomes "2m ago", "1 hour ago" becomes "1h ago", etc.
  // This is done by replacing the full words with their abbreviations
  const abbreviated = cleaned
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("days", "d")
    .replace("day", "d")
    .replace("months", "mo")
    .replace("month", "mo")
    .replace("years", "y")
    .replace("year", "y");

  // We want to combine the first two elements (e.g., "18 d" becomes "18d") and join it with the rest
  const parts = abbreviated.split(" ");
  if (parts.length > 2) {
    return `${parts[0]}${parts[1]} ${parts.slice(2).join(" ")}`;
  }

  return abbreviated;
}


export default function NotificationLi({notification}: { notification: Notification }) {
  return (
    <div className='flex gap-2 md:gap-4 items-center justify-center py-4 px-5 hover:bg-olive group'>
      <span className='inline-block !size-2 bg-olive rounded-full group-hover:bg-white' />
      <p className='grow group-hover:text-white'>
        {notification.message}
      </p>
      <p className='text-gray-500'>{formatRelativeTime(notification.created_at)}</p> {/* Add the text here */}
    </div>
  );
}

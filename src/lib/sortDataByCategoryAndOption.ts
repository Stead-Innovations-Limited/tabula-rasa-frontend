import { Event, Venue, User } from "@/lib/types";

export type SortOption =
  | "latest"
  | "participants"
  | "capacity"
  | "experience"
  | "rate"
  | "";

export function sortDataByCategoryAndOption(
  data: Event[] | Venue[] | User[],
  category: "events" | "venues" | "practitioners",
  sortBy: SortOption
): Event[] | Venue[] | User[] {
  if (!sortBy) return data;

  switch (category) {
    case "events": {
      const sorted = [...(data as Event[])];
      if (sortBy === "latest") {
        sorted.sort((a, b) => {
          const aDate = a.start_date?.Valid ? new Date(a.start_date.Time) : new Date(0);
          const bDate = b.start_date?.Valid ? new Date(b.start_date.Time) : new Date(0);
          return bDate.getTime() - aDate.getTime();
        });
      } else if (sortBy === "participants") {
        sorted.sort((a, b) => {
          const aVal = a.total_particpant?.Valid ? a.total_particpant.Int32 : -1;
          const bVal = b.total_particpant?.Valid ? b.total_particpant.Int32 : -1;
          return bVal - aVal;
        });
      }
      return sorted;
    }

    case "venues": {
      const sorted = [...(data as Venue[])];
      if (sortBy === "capacity") {
        sorted.sort((a, b) => {
          const aCap = a.capacity?.Valid ? a.capacity.Int32 : -1;
          const bCap = b.capacity?.Valid ? b.capacity.Int32 : -1;
          return bCap - aCap;
        });
      } else if (sortBy === "latest") {
        sorted.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      }
      return sorted;
    }

    case "practitioners": {
      const sorted = [...(data as User[])];
      if (sortBy === "rate") {
        sorted.sort((a, b) => {
          const aRate = a.rate?.Valid ? a.rate.Int32 : -1;
          const bRate = b.rate?.Valid ? b.rate.Int32 : -1;
          return bRate - aRate;
        });
      } else if (sortBy === "experience") {
        sorted.sort((a, b) => {
          const aVal = a.experience?.Valid ? a.experience.Int32 : -1;
          const bVal = b.experience?.Valid ? b.experience.Int32 : -1;
          return bVal - aVal;
        });
      }
      return sorted;
    }

    default:
      return data;
  }
}

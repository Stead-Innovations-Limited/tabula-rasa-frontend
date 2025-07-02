"use client"

import { z } from "zod/v4";

export const listVenueSchema = z.object({
  venueFiles: z.array(z.instanceof(File)).min(1, {
    message: "Please upload at least one file.",
  }),
  venueName: z
    .string()
    .min(2, { message: "Venue name cannot be less than 2 characters" })
    .max(80, { message: "Venue name cannot be 80 characters long." }),
  venueType: z.enum(["Yoga Studio", "Wellness Center", "Retreat Space"], {
    message: "Please select a valid venue type",
  }),
  venueDescription: z
    .string()
    .min(10, {
      message: "Venue description must be at least 10 characters long",
    })
    .max(500, {
      message: "Venue description cannot be more than 500 characters long.",
    }),
  location: z
    .string()
    .min(5, {
      message: "Location cannot be less than 5 characters",
    })
    .max(100, {
      message: "Location cannot be more than 100 characters long.",
    }),
  dimensions: z
    .string()
    .min(5, {
      message: "Dimension cannot be less than 5 characters",
    })
    .max(100, {
      message: "Dimension cannot be more than 100 characters long.",
    }),
  maxCapacity: z
    .string()
    .min(1, {
      message: "Please enter the maximum capacity of the venue",
    })
    .max(30, {
      message: "Maximum capacity cannot be more than 30 characters long.",
    }),
  facilities: z
    .string()
    .min(5, {
      message: "Facilities cannot be less than 5 characters",
    })
    .max(500, {
      message: "Facilities cannot be more than 500 characters long.",
    }),
  onSiteAccomodation: z.enum(["yes", "no"], {
    message: "Please select a valid option for on-site accommodation",
  }),
  roomType: z
    .string()
    .min(8, {
      message: "Room type cannot be less than 8 characters",
    })
    .max(50, {
      message: "Room type cannot be more than 50 characters long.",
    }),
  numberOfRooms: z
    .string()
    .min(5, {
      message: "No of Rooms cannot be less than 5 characters",
    })
    .max(100, {
      message: "No of Rooms cannot be more than 100 characters long.",
    }),
  sleeps: z.string().min(1, {
    message: "Please enter the number of people the venue can sleep",
  }),
  bedConfiguration: z
    .string()
    .min(5, {
      message: "Bed configuration cannot be less than 5 characters",
    })
    .max(100, {
      message: "Bed configuration cannot be more than 100 characters long.",
    }),
  roomAmenities: z
    .string()
    .min(5, {
      message: "Room amenities cannot be less than 5 characters",
    })
    .max(500, {
      message: "Room amenities cannot be more than 500 characters long.",
    }),
  pricePerHour: z
    .string()
    .min(1, {
      message: "Price per hour cannot be less than 5 characters",
    })
    .max(80, {
      message: "Price per hour cannot be more than 80 characters long.",
    }),
});

export const createEventSchema = z.object({
  eventFiles: z.array(z.instanceof(File)).min(1, {
    message: "Please upload at least one file.",
  }),
  eventTitle: z
    .string()
    .min(2, { message: "Event title cannot be less than 2 characters" })
    .max(80, { message: "Event title cannot be 80 characters long." }),
  eventTheme: z.enum(["Retreat", "Wellness", "Mindfulness"], {
    message: "Please select a valid event theme.",
  }),
  eventDescription: z
    .string()
    .min(10, {
      message: "Event description must be at least 10 characters long",
    })
    .max(500, {
      message: "Event description cannot be more than 500 characters long.",
    }),
  keyActivities: z.enum(
    ["Yoga", "Meditation", "Nutrition", "Wellness Coaching"],
    {
      message: "Please select at least one key activity.",
    }
  ),
  targetAudience: z.enum(
    ["All", "Adults", "Children", "Seniors", "Families"],
    {
      message: "Please select a valid target audience.",
    }
  ),
  location: z
    .string()
    .min(5, {
      message: "Location cannot be less than 5 characters",
    })
    .max(100, {
      message: "Location cannot be more than 100 characters long.",
    }),
  startDate: z.date({
    error: "Start date is required",
  }),
  endDate: z.date({
    error: "End date is required",
  }),
  maxParticipantsNo: z.enum(
    [
      "10-50",
      "50-100",
      "100-200",
      "200-500",
      "500-1000",
      "1000-2000",
      "2000+",
    ],
    {
      message: "Please select a valid number of participants",
    }
  ),
  pricePerParticipant: z
    .string()
    .min(1, {
      message: "Price per participant cannot be less than 5 characters",
    })
    .max(80, {
      message: "Price per participant cannot be more than 80 characters long.",
    }),
}).refine(data => data.endDate > data.startDate, {
  message: "endDate must be after startDate",
  path: ["endDate"],
});
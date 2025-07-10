"use client"

import { z } from "zod/v4";
// import { isPossiblePhoneNumber } from "libphonenumber-js";
// import { countries } from "./countries";

const isFileDefined = typeof File !== "undefined";

export const listVenueSchema = z.object({
   venueFiles: isFileDefined
    ? z.array(z.instanceof(File)).min(1, {
        message: "Please upload at least one file.",
      })
    : z.any(),
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
  eventFiles:  isFileDefined
    ? z.array(z.instanceof(File)).min(1, {
        message: "Please upload at least one file.",
      })
    : z.any(),
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

export const businessProfileSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "Fullname cannot be less than 2 characters" })
      .max(80, { message: "Fullname cannot be 80 characters long." }),
    lastname: z
      .string()
      .min(2, { message: "Fullname cannot be less than 2 characters" })
      .max(80, { message: "Fullname cannot be 80 characters long." }),
    email: z.email({ message: "Please enter a valid email." }).trim(),
    phone: z.string().min(4, { message: "Please put a valid phone number" }),
    serviceAddress: z
      .string()
      .min(5, { message: "Service address cannot be less than 5 characters" })
      .max(80, { message: "Service address cannot be 80 characters long." }),
    expertiseArea: z.string().min(1, {
      message: "Area of expertise is required"})
      .max(50, {
        message: "Area of expertise cannot be more than 50 characters long.",
      }),
    professionalExperience: z.enum(
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      {
        message: "Please select a valid professional experience",
      }
    ),
    businessRate: z
      .string()
      .min(1, {
        message: "Please enter your business rate",
      })
      .max(10, {
        message: "Business rate cannot be more than 10 characters long.",
      }),
    country: z.string(),
    bio: z
      .string()
      .min(10, { message: "Bio must be at least 10 characters long" })
      .max(250, { message: "Bio cannot be more than 250 characters long." }),
  })
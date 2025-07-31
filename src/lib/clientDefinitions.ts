"use client";

import { z } from "zod/v4";
import { parseDateTime } from "@internationalized/date";

export const listVenueSchema = z
  .object({
    venueId: z.string().optional(),
    venueFiles: z.any(),
    venueName: z
      .string()
      .min(2, { message: "Venue name cannot be less than 2 characters" })
      .max(80, { message: "Venue name cannot be 80 characters long." }),

    venueType: z
      .string()
      .min(5, { message: "Venue type cannot be less than 5 characters" })
      .max(40, { message: "Venue type cannot be more than 40 characters long." }),

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

    roomType: z.string().optional(),
    numberOfRooms: z.string().optional(),
    sleeps: z.string().optional(),
    bedConfiguration: z.string().optional(),
    roomAmenities: z.string().optional(),
    pricePerHour: z.string().optional(),
  })

  // Validation for always-required fields
  .refine((data) => !isNaN(Number(data.maxCapacity)), {
    message: "Please enter a valid capacity (number) for the venue",
    path: ["maxCapacity"],
  })

  // Conditional validations for on-site accommodation
  .refine(
    (data) =>
      data.onSiteAccomodation === "no" ||
      (data.roomType?.trim().length ?? 0) >= 2,
    {
      message: "Room type is required if on-site accommodation is available",
      path: ["roomType"],
    }
  )
  .refine(
    (data) =>
      data.onSiteAccomodation === "no" ||
      (data.sleeps?.trim().length ?? 0) >= 1,
    {
      message: "Sleeps is required if on-site accommodation is available",
      path: ["sleeps"],
    }
  )
  .refine(
    (data) =>
      data.onSiteAccomodation === "no" ||
      (data.bedConfiguration?.trim().length ?? 0) >= 2,
    {
      message: "Bed configuration is required if on-site accommodation is available",
      path: ["bedConfiguration"],
    }
  )
  .refine(
    (data) =>
      data.onSiteAccomodation === "no" ||
      (data.roomAmenities?.trim().length ?? 0) >= 2,
    {
      message: "Room amenities are required if on-site accommodation is available",
      path: ["roomAmenities"],
    }
  )
  .refine(
    (data) =>
      data.onSiteAccomodation === "no" ||
      (!isNaN(Number(data.numberOfRooms)) &&
        (data.numberOfRooms?.trim().length ?? 0) > 0),
    {
      message: "Please enter a valid number of rooms",
      path: ["numberOfRooms"],
    }
  )
  .refine(
    (data) =>
      data.onSiteAccomodation === "no" ||
      (!isNaN(Number(data.pricePerHour)) &&
        (data.pricePerHour?.trim().length ?? 0) > 0),
    {
      message: "Please enter a valid price per hour",
      path: ["pricePerHour"],
    }
  );

export const createEventSchema = z
  .object({
    eventId: z.string().optional(),
    eventFiles: z.any(),
    eventTitle: z
      .string()
      .min(2, { message: "Event title cannot be less than 2 characters" })
      .max(80, { message: "Event title cannot be 80 characters long." }),
    eventTheme: z
      .string()
      .min(2, { message: "Event theme cannot be less than 2 characters" })
      .max(80, { message: "Event theme cannot be 80 characters long." }),
    eventDescription: z
      .string()
      .min(10, {
        message: "Event description must be at least 10 characters long",
      })
      .max(500, {
        message: "Event description cannot be more than 500 characters long.",
      }),
    keyActivities: z
      .string()
      .min(2, { message: "Key activities cannot be less than 2 characters" })
      .max(80, { message: "Key activities cannot be 80 characters long." }),
    targetAudience: z
      .string()
      .min(2, { message: "Target Audience cannot be less than 2 characters" })
      .max(80, { message: "Target Audience cannot be 80 characters long." }),
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
    startTime: z.string().regex(/^([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/, {
      message: "Start time must be in HH:MM:SS format",
    }),
    endTime: z.string().regex(/^([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/, {
      message: "End time must be in HH:MM:SS format",
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
        message: "Price per participant cannot be less than 1 character",
      })
      .max(80, {
        message:
          "Price per participant cannot be more than 80 characters long.",
      }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after Start Date",
    path: ["endDate"],
  })
  // Here i do a check to ensure that the end time is after the start time
  .refine(
    (data) => {
      return (parseDateTime(
        data.endDate.toISOString().split("T")[0].concat("T", data.endTime)
      ) >
      parseDateTime(
        data.startDate.toISOString().split("T")[0].concat("T", data.startTime)
      ))},
    {
      message: "End time must be later than startTime",
      path: ["endTime"],
    }
  )
  // Here i do a check to ensure that the price per participant can be a valid number
  .refine((data) => !isNaN(Number(data.pricePerParticipant)), {
    message: "Please enter a valid price per participant",
    path: ["pricePerParticipant"],
  });

export const businessProfileSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Full name cannot be less than 2 characters" })
    .max(80, { message: "Full name cannot be 80 characters long." }),
  lastname: z
    .string()
    .min(2, { message: "Full name cannot be less than 2 characters" })
    .max(80, { message: "Full name cannot be 80 characters long." }),
  email: z.email({ message: "Please enter a valid email." }).trim(),
  phone: z.string().min(4, { message: "Please put a valid phone number" }),
  businessName: z
    .string()
    .min(2, { message: "Business name cannot be less than 2 characters" })
    .max(80, { message: "Business name cannot be 80 characters long." }),
  serviceAddress: z
    .string()
    .min(5, { message: "Service address cannot be less than 5 characters" })
    .max(80, { message: "Service address cannot be 80 characters long." }),
  expertiseArea: z
    .string()
    .min(1, {
      message: "Area of expertise is required",
    })
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
});

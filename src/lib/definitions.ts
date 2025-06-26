import { z } from "zod/v4";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import { countries } from "./countries";

export const mailSubscriptionSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
});

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
});

export const signupSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Fullname cannot be less than 2 characters" })
    .max(80, { message: "Fullname cannot be 80 characters long." }),
  lastname: z
    .string()
    .min(2, { message: "Fullname cannot be less than 2 characters" })
    .max(80, { message: "Fullname cannot be 80 characters long." }),
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Confirm Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Confirm Password must contain at least one uppercase letter",
    })
    .regex(/\d/, {
      message: "Confirm Password must contain at least one number",
    })
    .regex(/[@$!%*?&#]/, {
      message: "Confirm Password must contain at least one special character",
    }),
});

export const personalProfileSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Fullname cannot be less than 2 characters" })
    .max(80, { message: "Fullname cannot be 80 characters long." }),
  lastname: z
    .string()
    .min(2, { message: "Fullname cannot be less than 2 characters" })
    .max(80, { message: "Fullname cannot be 80 characters long." }),
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
    expertiseArea: z.enum(
      [
        "Vinyasa Yoga",
        "Mindfulness & Meditation",
        "Emotional Healing & Inner Work",
        "Holistic Nutrition & Wellness Coaching",
      ],
      {
        message: "Please select a valid area of expertise",
      }
    ),
    professionalExperience: z.enum(
      ["Less than 1 year", "1-3 years", "3-5 years", "5+ years"],
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
    // country: z.enum([...countries], {
    //   message: "Please select a valid country",
    // }),
    country: z.union(countries.map((name) => z.literal(name))),
    bio: z
      .string()
      .min(10, { message: "Bio must be at least 10 characters long" })
      .max(250, { message: "Bio cannot be more than 250 characters long." }),
  })
  .refine((data) => isPossiblePhoneNumber(data.phone), {
    message: "Phone number is invalid",
    path: ["phone"],
  });

export const venueSchema = z.object({
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

export const editEventSchema = z.object({
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
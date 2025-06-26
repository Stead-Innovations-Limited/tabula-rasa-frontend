"use server";

import { z } from "zod/v4";
import { venueSchema } from "@/lib/definitions";
type VenueFormData = z.infer<typeof venueSchema>;

export interface EditVenueState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: { venueName?: string[];
    venueType?: string[];
    venueDescription?: string[];
    location?: string[];
    dimension?: string[];
    maxCapacity?: string[];
    facilities?: string[];
    onSiteAccomodation?: string[];
    roomType?: string[];
    numberOfRooms?: string[];
    pricePerHour?: string[]; };
}

export default async function editVenueAction(
  state: EditVenueState | undefined,
  data: VenueFormData
) {
  try {
    const validatedFields = venueSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const {
      venueName,
      venueType,
      venueDescription,
      location,
      dimensions,
      maxCapacity,
      facilities,
      onSiteAccomodation,
      roomType,
      numberOfRooms,
      sleeps,
      bedConfiguration,
      roomAmenities,
      pricePerHour,
    } = validatedFields.data;

    // Here you would typically handle the business profile logic, such as calling an API
    console.log("Business Profile Data:", {
      venueName,
      venueType,
      venueDescription,
      location,
      dimensions,
      maxCapacity,
      facilities,
      onSiteAccomodation,
      roomType,
      numberOfRooms,
      sleeps,
      bedConfiguration,
      roomAmenities,
      pricePerHour
    });

    return {
      success: true,
      message: "Venue edited sucessfully.",
    };
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to edit venue.",
    };
  }
}

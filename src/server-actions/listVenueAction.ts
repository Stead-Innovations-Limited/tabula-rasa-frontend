"use server";

import { z } from "zod/v4";
import { listVenueSchema } from "@/lib/definitions";
type ListVenueFormData = z.infer<typeof listVenueSchema>;
export interface ListVenueState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: { venueName?: string[];
    venueImages?: string[];
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

export default async function listVenueAction(
  state: ListVenueState | undefined,
  data: ListVenueFormData
) {
  try {
    const validatedFields = listVenueSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const {
      venueName,
      venueFiles,
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
    console.log("List Venue Data:", {
      venueName,
      venueFiles,
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
    });

    return { success: true, message: "Venue listed successfully!" };
  } catch (error) {
    console.error("Error listing venue:", error);
    return { error: true, message: "Failed to list venue." };
  }
}
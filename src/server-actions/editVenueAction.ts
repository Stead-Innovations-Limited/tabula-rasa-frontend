"use server";

import { revalidatePath } from 'next/cache'
import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { z } from "zod/v4";
import { listVenueSchema } from "@/lib/definitions";
type ListVenueFormData = z.infer<typeof listVenueSchema>;
export interface ListVenueState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: {
    venueName?: string[];
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
    pricePerHour?: string[];
  };
}

export default async function editVenueAction(
  state: ListVenueState | undefined,
  data: ListVenueFormData
) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to edit venue.");
    }
    if (
      !session ||
      (session as Session & { roles?: string }).user.roles !== "Business Account"
    ) {
      throw new Error("You are not authorized to edit a venue.");
    }

    const token = session.sessionToken;

    const validatedFields = listVenueSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const {
      venueId,
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
      // roomAmenities,
      pricePerHour,
    } = validatedFields.data;

    if(venueFiles.length < 1) {
      throw new Error("Please upload at least one image for the venue.");
    }

    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/venues/${venueId}`,{
          name: venueName,
          type: venueType,
          description: venueDescription,
          location,
          dimension: dimensions,
          capacity: parseInt(maxCapacity),
          facilities: [facilities],
          image_links: venueFiles,
          has_accomodation: onSiteAccomodation === "yes" ? true : false,
          room_type: roomType,
          no_of_rooms: parseInt(numberOfRooms ?? "0"),
          sleeps,
          bed_type: bedConfiguration,
          booking_price: Number(pricePerHour ?? "0"),
          is_available: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    });

    if (response.isError) {
      throw new Error(
        typeof response.errors === "string"
          ? response.errors
          : response.errors.join(", ")
      );
    }

    revalidatePath('/(dashboard)/venues', 'page')
    revalidatePath('/(dashboard)/dashboard', 'page')

    return { success: true, message: "Venue edited successfully!" };
  } catch (error) {
    return { error: true, message: error instanceof Error ? error.message : "Failed to edit venue." };
  }
}

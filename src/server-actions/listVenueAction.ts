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

export default async function listVenueAction(
  state: ListVenueState | undefined,
  data: ListVenueFormData
) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to fetch user details.");
    }
    if (
      !session ||
      (session as Session & { roles?: string }).user.roles !== "Business Account"
    ) {
      throw new Error("You are not authorized to list a venue.");
    }

    const token = session.sessionToken;

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
      // roomAmenities,
      pricePerHour,
    } = validatedFields.data;

    const response = await tryCatch(async () => {
      return await axios.post(
        `https://tabula-rasa-backend.up.railway.app/venues/`,{
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
          no_of_rooms: parseInt(numberOfRooms),
          sleeps,
          bed_type: bedConfiguration,
          booking_price: parseInt(pricePerHour),
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
      console.log(response.errors, "response.errors");
      throw new Error(
        typeof response.errors === "string"
          ? response.errors
          : response.errors.join(", ")
      );
    }

    revalidatePath('/(dashboard)/venues', 'page')
    revalidatePath('/(dashboard)/dashboard', 'page')

    return { success: true, message: "Venue listed successfully!" };
  } catch (error) {
    console.error("Error listing venue:", error);
    return { error: true, message: "Failed to list venue." };
  }
}

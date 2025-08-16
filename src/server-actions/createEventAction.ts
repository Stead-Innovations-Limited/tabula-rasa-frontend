"use server";

import { revalidatePath } from "next/cache";
import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { z } from "zod/v4";
import { createEventSchema } from "@/lib/definitions";
import { formatLocalDate } from "@/lib/utils";
type createEventFormData = z.infer<typeof createEventSchema>;

export interface createEventState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: {
    eventFiles?: string[];
    eventTitle?: string[];
    eventTheme?: string[];
    eventDescription?: string[];
    keyActivities?: string[];
    targetAudience?: string[];
    location?: string[];
    venueName?: string[];
    venueLocation?: string[];
    startDate?: string[];
    endDate?: string[];
    maxParticipantsNo?: string[];
    pricePerParticipant?: string[];
  };
}

export default async function createEventAction(
  state: createEventState | undefined,
  data: createEventFormData
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
      (session as Session & { roles?: string }).user.roles !==
        "Business Account"
    ) {
      throw new Error("You are not authorized to create an event.");
    }

    const token = session.sessionToken;

    const validatedFields = createEventSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const {
      eventFiles,
      eventTitle,
      eventTheme,
      eventDescription,
      keyActivities,
      targetAudience,
      useOurVenue,
      venueName,
      venueLocation,
      location,
      startDate,
      endDate,
      startTime,
      endTime,
      maxParticipantsNo,
      pricePerParticipant,
    } = validatedFields.data;

    if (eventFiles.length < 1) {
      throw new Error("Please upload at least one image for the event.");
    }
    const response = await tryCatch(async () => {
      return await axios.post(
        `https://tabula-rasa-backend.up.railway.app/events/`,
        {
          ...(useOurVenue === "yes" ? { venue_id: location } : {
            venue_name: venueName,
            venue_location: venueLocation,
          }),
          venue_is_listed: useOurVenue === "yes" ? true : false,
          image_links: eventFiles,
          name: eventTitle,
          theme: eventTheme,
          description: eventDescription,
          audience: targetAudience,
          activities: [keyActivities],
          start_time: startTime,
          end_time: endTime,
          // We format it this way by not using Iso String conversion as it could interfere with the date at 23:00 or 00:00 at times
          start_date: formatLocalDate(startDate),
          end_date: formatLocalDate(endDate),
          total_particpant: parseInt(maxParticipantsNo),
          price: Number(pricePerParticipant) * 100 || 0, // Convert to cents
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

    revalidatePath('/(dashboard)/events', 'page')
    revalidatePath('/(dashboard)/dashboard', 'page')

    return { success: true, message: "Event created successfully!" };
  } catch (error) {
    return { error: true, message: error instanceof Error ? error.message : "Failed to create event." };
  }
}

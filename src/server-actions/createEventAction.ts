"use server";

import { z } from "zod/v4";
import { createEventSchema } from "@/lib/definitions";
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
    startDate?: string[];
    endDate?: string[];
    maxParticipantsNo?: string[];
    pricePerParticipant?: string[];
    };
}

export default async function createEventAction(state: createEventState | undefined, data: createEventFormData) {
  try {
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
      location,
      startDate,
      endDate,
      maxParticipantsNo,
      pricePerParticipant,
    } = validatedFields.data;

    // Here you would typically handle the event logic, such as calling an API
    console.log("Event Data:", {
      eventFiles,
      eventTitle,
      eventTheme,
      eventDescription,
      keyActivities,
      targetAudience,
      location,
      startDate,
      endDate,
      maxParticipantsNo,
      pricePerParticipant,
    });

    return { success: true, message: "Event updated successfully!" };
  } catch (error) {
    console.error("Error updating event:", error);
    return { error: true, message: "Failed to update event." };
  }

}
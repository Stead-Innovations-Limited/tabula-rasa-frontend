"use server";

import { z } from "zod/v4";
import { editEventSchema } from "@/lib/definitions";
type EditEventFormData = z.infer<typeof editEventSchema>;

export interface EditEventState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: { eventTitle?: string[];
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

export default async function editEventAction(state: EditEventState | undefined, data: EditEventFormData) {
  try {
    const validatedFields = editEventSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const {
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
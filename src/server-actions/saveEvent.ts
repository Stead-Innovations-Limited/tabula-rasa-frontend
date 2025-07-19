"use server";

import { revalidatePath } from 'next/cache'
import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


export default async function saveEvent(eventId: string) {
  try {
    if(!eventId) throw new Error("Event ID is required to save an event.");

    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to save an event.");
    }
    if (
      !session ||
      !(session as Session & { id?: string }).user.id
    ) {
      throw new Error("User Id is needed to save an event.");
    }

    const token = session.sessionToken;

    const response = await tryCatch(async () => {
      return await axios.post(
        `https://tabula-rasa-backend.up.railway.app/events/${eventId}/save`,{},
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

    revalidatePath('/(saved)/saved', 'page')

    return { success: true, message: "Event saved successfully!" };
  } catch (error) {
    console.error("Error saving event:", error);
    return { error: true, message: "Failed to save an event." };
  }
}
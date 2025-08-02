"use server";

import { revalidatePath } from 'next/cache'
import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


export default async function removeSavedVenue(venueId: string) {
  try {
    if(!venueId) throw new Error("Venue ID is required to remove a saved venue.");

    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to remove a saved venue.");
    }
    if (
      !session ||
      !(session as Session & { id?: string }).user.id
    ) {
      throw new Error("User Id is needed to remove a saved venue.");
    }

    const token = session.sessionToken;

    const response = await tryCatch(async () => {
      return await axios.delete(
        `https://tabula-rasa-backend.up.railway.app/venues/${venueId}/remove`,
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

    return { success: true, message: "Venue removed from saved successfully!" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: true, message: "Failed to remove venue from saved." };
  }
}
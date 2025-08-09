"use server";

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


export default async function saveVenue(venueId: string) {
  try {
    if(!venueId) throw new Error("Venue ID is required to save a venue.");

    const session = await getServerSession(authOptions);

    // We detect if the request is an authenticated request, if it is not, we redirect to "/login"
    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      redirect("/login");
    }
    if (
      !session ||
      !(session as Session & { id?: string }).user.id
    ) {
      redirect("/login");
    }

    const token = session.sessionToken;

    const response = await tryCatch(async () => {
      return await axios.post(
        `https://tabula-rasa-backend.up.railway.app/venues/${venueId}/save`,{},
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

    return { success: true, message: "Venue saved successfully!" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: true, message: "Failed to save a venue." };
  }
}
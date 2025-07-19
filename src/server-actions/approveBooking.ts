"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function approveBooking(eventId: string, venueId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to approve booking.");
    }

    const token = session.sessionToken;

    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/events/${eventId}/accept`, {},
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

    revalidatePath(`/my-venues/${venueId}/view-bookings`);
    return {
      error: false,
      data: response.data,
      message: "Booking approved successfully."
    };

  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Booking approval failed.",
    };
  }
}
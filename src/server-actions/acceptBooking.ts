"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function acceptBooking(serviceId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to accept this booking.");
    }

    const token = session.sessionToken;

    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/services/${serviceId}/accept`,{
          status: "confirmed",
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
    // Revalidate the path to ensure the latest data is fetched
    revalidatePath(`/bookings/`);
    return {
      error: false,
      message: "Booking confirmed successfully.",
    };
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to confirm booking.",
    };
  }
}
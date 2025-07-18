"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { WorkingSchedule } from "@/lib/types";

export default async function saveVenueSchedule(venueId: string, venueSchedule: WorkingSchedule) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to save venue schedule.");
    }

    const token = session.sessionToken;

    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/venues/${venueId}`,{
          working_schedule: venueSchedule,
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
    return {
      error: false,
      message: "Venue schedule saved successfully.",
    };
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to save venue schedule.",
    };
  }
}
"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Venue } from "@/lib/types";

export default async function getVenue(venueId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to fetch venue details.");
    }

    const token = session.sessionToken;

    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/venues/`,
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
    const data = response.data as Venue[];
    const venueData = data.find((ele: Venue) => ele.id === venueId);
    if (!venueData) {
      throw new Error("Venue not found.");
    }

    return venueData;
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to fetch venue.",
    };
  }
}
"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export interface Saved {
  user_id: string;
  venue_id: string;
  created_at: string;
}

export default async function getSavedVenue() {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      return {
      error: false,
      data: []
    };
    }

    if (
      !session ||
      !(session as Session & { id?: string }).user.id
    ) {
      return {
      error: false,
      data: []
    };
    }

    const token = session.sessionToken;
    const userId = session.user.id;

    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/venues/saved`,
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
    const data = response.data as Saved[];
    const venueData = data.filter((ele: Saved) => ele.user_id === userId);

    if (!venueData) {
      return {
      error: false,
      data: data
    };
    }

    return {
      error: false,
      data: venueData
    };
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to fetch saved venue.",
    };
  }
}

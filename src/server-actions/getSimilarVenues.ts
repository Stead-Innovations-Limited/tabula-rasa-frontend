"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Venue } from "@/lib/types";

export default async function getSimilarVenues() {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to fetch similar venues.");
    }

    if (
      !session ||
      !(session as Session & { id?: string }).user.id
    ) {
      throw new Error("User has to be authenticated to fetch similar venues.");
    }

    const token = session.sessionToken;
    const userId = session.user.id;

    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/venues/similar/${userId}`,
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

    return response.data as Venue[];
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to fetch similar venues.",
    };
  }
}
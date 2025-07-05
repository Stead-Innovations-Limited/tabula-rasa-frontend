"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function getMyVenues() {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to fetch your venue details.");
    }

    if (!session || !(session as Session & { id?: string }).user.id) {
      throw new Error("User Id is required to fetch your venue details.");
    }
    const token = session.sessionToken;
    const userId = session.user.id;

    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/venues/user/${userId}/`,
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

    return response.data;
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to fetch your venues.",
    };
  }
}

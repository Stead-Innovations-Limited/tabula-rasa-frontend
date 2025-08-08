"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { Venue } from "@/lib/types";

export default async function getSimilarVenues(venueId: string) {
  try {
     
    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/venues/similar/${venueId}`,
        {
          headers: {
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
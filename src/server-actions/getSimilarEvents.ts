"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch"; 

export default async function getEvents(eventId: string) {
  try {

    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/events/similar/${eventId}`,
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

    return response.data;
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to fetch similar event details.",
    };
  }
}

"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";

export async function getUserDetails(token: string | undefined) {
  try {
    if(!token) {
      throw new Error("Token is required to fetch user details.");
    }

    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/users/me`,
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
  
    console.log(response.data);
    return response.data;

  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to update business profile.",
    };
  }
}
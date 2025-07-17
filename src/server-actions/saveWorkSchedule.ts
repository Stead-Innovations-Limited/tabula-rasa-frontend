"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { WorkingSchedule } from "@/lib/types";

export default async function saveWorkSchedule(workSchedule: WorkingSchedule) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to save work schedule.");
    }

    if (
      !session ||
      !(session as Session & { id?: string }).user.id
    ) {
      throw new Error("User is unauthorized.");
    }
    const token = session.sessionToken;
    const userId = session.user.id;

    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/users/profile/${userId}`,{
          working_schedule: workSchedule,
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
      message: "Work schedule saved successfully.",
    }
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to save work schedule.",
    };
  }
}
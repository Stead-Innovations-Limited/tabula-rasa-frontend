"use server";


import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function setAccountToBusiness() {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error(
        "Token is required to set the personal account to business account."
      );
    }

    if (!session || !(session as Session & { id?: string }).user.id) {
      throw new Error(
        "UserId is required to set the personal account to business account."
      );
    }

    const token = session.sessionToken;
    const userId = session.user.id;

    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/users/profile/${userId}`,
        {
          roles: "Business Account",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    });

    // If there was an error in the response, we'll as well throw the error
    if (response.isError) {
      throw new Error(
        typeof response.errors === "string"
          ? response.errors
          : response.errors.join(", ")
      );
    }
    revalidatePath("/profile");
    // If the response was successful, we tell the client
    return {
      error: false,
      data: "Successfully changed account to a Business account."
    }

  } catch (error) {
    return {
      error: true,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

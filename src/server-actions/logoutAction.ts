"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function logoutAction() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !(session as Session & { sessionToken?: string }).sessionToken
  ) {
    throw new Error("Token is required to fetch user details.");
  }

  const token = session.sessionToken;

  const response = await tryCatch(async () => {
        return await axios.post(
          `https://tabula-rasa-backend.up.railway.app/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

  if (response.isError) {
    return {
      error: true,
      errorData: response.errors,
      message: "Logout failed.",
    };
  } else {
    const data = response.data as { message?: string };
    return {
      success: true,
      message:
        data.message ||
        "Logout successful.",
    };
  }
}

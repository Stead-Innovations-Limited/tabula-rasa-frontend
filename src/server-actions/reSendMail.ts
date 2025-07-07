"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";

export default async function reSendMail(token: string) {
  try {
  const response = await tryCatch(async () => {
    return await axios.post(
      "https://tabula-rasa-backend.up.railway.app/resend-verification-email",
      { token },
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
  }catch(error) {
    return {
      error: true,
      errorMessage: typeof error === "string" ? error : "An error occurred while resending the email.",
    };
  }
}

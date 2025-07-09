"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import reSendMail from "@/server-actions/reSendMail";

export default async function verifyEmail(token: string) {
  try {
    const response = await tryCatch(async () => {
      return await axios.post(
        "https://tabula-rasa-backend.up.railway.app/verify-email",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    // If there is an error in the response, handle it
    // This could be due to an invalid or expired token
    if (response.isError) {
      if (
        response.errors ===
        "Invalid or expired verification token: token has expired"
      ) {
        // If the error is due to an expired token, we will resend the verification email
        const resendResponse = (await reSendMail(token)) as {
          message?: string;
          error?: boolean;
          errorMessage?: string;
        };
        // If there is an error sending mail, we throw an error
        if (resendResponse?.error) {
          throw new Error("An error occurred while verifying your mail.");
        }
        // If the resend was successful, return a message indicating that the token has expired and a new email has been sent
        throw new Error(
          "An error occured while verifying your mail. A new verification email has been sent to you."
        );
      }
 
      const error = typeof response.errors === "string"
          ? response.errors
          : response.errors.join(", ")

      throw new Error(error);
    }

    // If the response is successful, redirect them to pick a profile type
    return {
      error: false,
      message: response.data,
    };
  } catch (error) {
    return {
      error: true,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

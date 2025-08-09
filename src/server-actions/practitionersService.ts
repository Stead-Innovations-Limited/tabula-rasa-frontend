"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function practitionersService(
  startTime: string,
  endTime: string,
  date: string,
  pracId: string,
  amount: number
) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to book practitioner.");
    }

    const token = session.sessionToken;


    const response = await tryCatch(async () => {
      return await axios.post(
        `https://tabula-rasa-backend.up.railway.app/services`,
        {
          user_id: pracId,
          start_time: startTime,
          end_time: endTime,
          date: date,
          price: amount,
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
    };
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Payment failed.",
    };
  }
}

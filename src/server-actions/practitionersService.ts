"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function practitionersService(
  pracId: string,
  amount: string
) {
  try {
    console.log(pracId, amount, "Paryuadf");
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to make payments.");
    }

    const token = session.sessionToken;

    const response = await tryCatch(async () => {
      return await axios.post(
        `https://tabula-rasa-backend.up.railway.app/purchases`,
        {
          service_id: pracId,
          amount: amount,
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
    
    // From here payment request was successful, so we simply redirect to the /payment-successful page
    redirect(`/practitioners/${pracId}/payment-successful`);
  } catch (error) {
    if (
    error instanceof Error &&
    error.message.toLowerCase().includes("insufficient funds")
    ) {
      redirect("/insufficient-funds");
    }
    return {
      error: true,
      errorData: error,
      message: "Failed to fetch practitioners bookings.",
    };
  }
}

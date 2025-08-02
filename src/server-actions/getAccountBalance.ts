"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface WalletResponse {
  id: string;
  user_id: string;
  balance: string;
  stripe_account_id: string | null | undefined | number;
  created_at: string;
  updated_at: string;
}

export default async function getAccountBalance() {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to fetch account balance.");
    }

    const token = session.sessionToken;
    
    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/wallet`,
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
    const data = response.data as WalletResponse;
    return data.balance;
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to fetch account balance.",
    };
  }
}

"use server"

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


export default async function withdrawFunds(amount: number, accNo: string, accName: string, bankName: string) {
  try {
      const session = await getServerSession(authOptions);
  
      if (
        !session ||
        !(session as Session & { sessionToken?: string }).sessionToken
      ) {
        throw new Error("Token is required to withdraw funds");
      }
  
      const token = session.sessionToken;
  
      const response = await tryCatch(async () => {
        return await axios.post(
          `https://tabula-rasa-backend.up.railway.app/wallet/withdraw`,{
            amount: amount,
            account_number: accNo,
            routing_number: "110000000",
            account_holder_name: accName,
            bank_name: bankName
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
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        error: true,
        message: "Failed to withdraw funds.",
      }
    }
}
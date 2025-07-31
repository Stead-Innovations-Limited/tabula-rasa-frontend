"use server"

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface ServerTransactions {
  id: string,
  wallet_id: string,
  amount: string,
  type: string,
  description: string,
  created_at: string
}

export default async function getAccountTransactions() {
  try {
      const session = await getServerSession(authOptions);
  
      if (
        !session ||
        !(session as Session & { sessionToken?: string }).sessionToken
      ) {
        throw new Error("Token is required to fetch wallet transactions.");
      }
  
      const token = session.sessionToken;
  
      const response = await tryCatch(async () => {
        return await axios.get(
          `https://tabula-rasa-backend.up.railway.app/wallet/transactions`,
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
  
      const data = response.data as ServerTransactions[];
      // We transform the data
      const mapping = data.map(ele => {
        return {
          description: ele.description,
          date: ele.created_at.split("T")[0],
          amount: "$" + parseInt(ele.amount).toFixed(2),
          status: ele.type.charAt(0).toUpperCase() + ele.type.slice(1)
        }
      })

      return mapping;
    } catch (error) {
      return {
        error: true,
        errorData: error,
        message: "Failed to fetch wallet transactions",
      };
    }
}
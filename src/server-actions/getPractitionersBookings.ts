"use server"


import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { PractitionersBookings } from "@/lib/types";


export default async function getPractitionersBookings() {
  try {
      const session = await getServerSession(authOptions);
  
      if (
        !session ||
        !(session as Session & { sessionToken?: string }).sessionToken
      ) {
        throw new Error("Token is required to fetch practitioners bookings.");
      }
  
      if (
        !session ||
        !(session as Session & { id?: string }).user.id
      ) {
        throw new Error("UserId is required to fetch practitioners bookings.");
      }
  
      const token = session.sessionToken;
      const userId = session.user.id;
  
      const response = await tryCatch(async () => {
        return await axios.get(
          `https://tabula-rasa-backend.up.railway.app/bookings/user/${userId}`,
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
      const data = response.data as PractitionersBookings[];
      const bookings = data.map(ele => ele.booked_for.split("T")[0]); 
  
      return bookings;
    } catch (error) {
      return {
        error: true,
        errorData: error,
        message: "Failed to fetch practitioners bookings.",
      };
    }
}
"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { EventRegistration } from "@/lib/types";


export default async function getEventRegistrations(eventId: string) {
  try {
      const session = await getServerSession(authOptions);
  
      if (
        !session ||
        !(session as Session & { sessionToken?: string }).sessionToken
      ) {
        throw new Error("Token is required to fetch your event registrations.");
      }
  
      if (!session || !(session as Session & { id?: string }).user.id) {
        throw new Error("User Id is required to fetch your event registrations.");
      }
      const token = session.sessionToken;
      const userId = session.user.id;
  
      const response = await tryCatch(async () => {
        return await axios.get(
          `https://tabula-rasa-backend.up.railway.app/events/owner/${userId}/participants`,
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
  
      const eventRegistry = response.data;
      const filteredRegistrations = (eventRegistry as EventRegistration[]).filter(
        (registrations) => registrations.event.id === eventId
      );

      // Return an empty array if no registrations found for the eventId
      return filteredRegistrations || []; 
    } catch (error) {
      return {
        error: true,
        errorData: error,
        message: "Failed to fetch your event registrations.",
      };
    }
}
"use server";

import { Session } from "next-auth";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { ServiceBooking, User } from "@/lib/types";

export default async function getPractServices() {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to fetch practitioners bookings.");
    }

    if (!session || !(session as Session & { id?: string }).user.id) {
      throw new Error("UserId is required to fetch practitioners bookings.");
    }

    const token = session.sessionToken;
    const userId = session.user.id;
    const response = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/services/user/${userId}`,
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

    const data = response.data as ServiceBooking[];
    // I fetch my location and field to populate the data
    const response1 = await tryCatch(async () => {
      return await axios.get(
        `https://tabula-rasa-backend.up.railway.app/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    });

    if (response1.isError) {
      throw new Error(
        typeof response.errors === "string"
          ? response.errors
          : response.errors.join(", ")
      );
    }

    const enrichedData = data.map((service) => ({
      ...service,
      location: (response1.data as User).address.String,
      field: (response1.data as User).field.String,
    }));
    return enrichedData;
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to fetch practitioners bookings.",
    };
  }
}

"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { User } from "@/lib/types"

export interface BusinessUserResponse {
  id: string;
  bio: string;
  image_link: string;
  phone_no: string;
  country: string;
  address: string;
  experience: number;
  field: string;
  business_name: string;
  roles: string;
  rate: number;
  error?: boolean;
  errorData?: string;
  message?: string;
}

export async function getUserDetails(token: string | undefined) {
  try {
    if(!token) {
      throw new Error("Token is required to fetch user details.");
    }

    const response = await tryCatch(async () => {
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

    if (response.isError) {
      throw new Error(
        typeof response.errors === "string"
          ? response.errors
          : response.errors.join(", ")
      );
    }
    
    const data = response.data as User;
    const responseBody = {
      id: data.id,
      bio: data.bio.String,
      image_link: data.image_link.String,
      phone_no: data.phone_no.String,
      country: data.country.String,
      address: data.address.String,
      experience: data.experience.Int32,
      field: data.field.String,
      business_name: data.business_name.String,
      roles: data.roles,
      rate: data.rate.Int32
    }
    return responseBody;
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to update business profile.",
    };
  }
}
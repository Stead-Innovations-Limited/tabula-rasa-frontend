"use server";

import { z } from "zod/v4";

import { personalProfileSchema } from "@/lib/definitions";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";

export interface PersonalProfileState {
  success?: boolean;
  data?: {
    firstname: string;
    lastname: string;
  };
  message?: string;
  error?: boolean;
  errors?: {
    firstname?: string[];
    lastname?: string[];
  };
}

type PersonalProfileFormData = z.infer<typeof personalProfileSchema>;

export default async function personalProfileAction(
  state: PersonalProfileState | undefined,
  data: PersonalProfileFormData
) {

  try {
    const validatedFields = personalProfileSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }


    const { firstname, lastname, token, userId } = validatedFields.data;

    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/users/${userId}`,
        { firstname, lastname },
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
      success: true,
      data: { firstname, lastname },
      message: "Personal profile updated successfully.",
    };
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to update personal profile.",
    };
  }
}


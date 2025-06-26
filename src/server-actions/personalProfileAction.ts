"use server";

import { z } from "zod/v4";

import { personalProfileSchema } from "@/lib/definitions";

export interface PersonalProfileState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: { 
    firstname?: string[];
    lastname?: string[] 
  };
}

type PersonalProfileFormData = z.infer<typeof personalProfileSchema>;

export default async function personalProfileAction(state: PersonalProfileState | undefined, data: PersonalProfileFormData) {
  try {
    const validatedFields = personalProfileSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { firstname, lastname } = validatedFields.data;

    // Here you would typically handle the personal profile logic, such as calling an API
    console.log("Personal Profile Data:", {
      firstname,
      lastname,
    });

    return {
      success: true,
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

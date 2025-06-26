"use server";

import { z } from "zod/v4";

import { businessProfileSchema } from "@/lib/definitions";

export interface BusinessProfileState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: { email?: string[] };
}

type BusinessProfileFormData = z.infer<typeof businessProfileSchema>;

export default async function businessProfileAction(state: BusinessProfileState | undefined, data: BusinessProfileFormData) {
  try {
    const validatedFields = businessProfileSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { firstname, lastname, email, phone, serviceAddress, expertiseArea, professionalExperience, businessRate, country, bio } = validatedFields.data;

    // Here you would typically handle the business profile logic, such as calling an API
    console.log("Business Profile Data:", {
      firstname,
      lastname,
      email,
      phone,
      serviceAddress,
      expertiseArea,
      professionalExperience,
      businessRate,
      country,
      bio,
    });

    return {
      success: true,
      message: "Business profile updated successfully.",
    };
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to update business profile.",
    };
  }

}

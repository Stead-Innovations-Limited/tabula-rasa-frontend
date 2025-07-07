"use server";

import { z } from "zod/v4";

import { businessProfileSchema } from "@/lib/definitions";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";


type BusinessProfileFormData = z.infer<typeof businessProfileSchema>;

export interface BusinessProfileState {
  success?: boolean;
  data?: BusinessProfileFormData;
  message?: string;
  error?: boolean;
  errors?: { email?: string[] };
}



export default async function businessProfileAction(state: BusinessProfileState | undefined, data: BusinessProfileFormData) {
  try {
    const validatedFields = businessProfileSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { firstname, lastname, email, phone, serviceAddress, expertiseArea, professionalExperience, businessRate, country, bio, token, userId } = validatedFields.data;

    console.log(email);
    
    const normalDetailsResponse = await tryCatch(async () => {
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

    if (normalDetailsResponse.isError) {
      throw new Error(
        typeof normalDetailsResponse.errors === "string"
          ? normalDetailsResponse.errors
          : normalDetailsResponse.errors.join(", ")
      );
    }

    // Here you would typically handle the business profile logic, such as calling an API
    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/users/profile/${userId}`,
        {
          phone_no: phone,
          address: serviceAddress,
          field: expertiseArea,
          experience: professionalExperience,
          business_name: firstname + " " + lastname,
          rate: businessRate,
          country,
          bio,
          // email,
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

    return {
      success: true,
      data: validatedFields.data,
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

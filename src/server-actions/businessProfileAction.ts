"use server";

import { z } from "zod/v4";

import { businessProfileSchema } from "@/lib/definitions";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import workSchedule from "@/lib/workSchedule";


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
    const { firstname, lastname, email, phone, businessName, serviceAddress, expertiseArea, professionalExperience, businessRate, country, bio, token, userId } = validatedFields.data;

    // Here we update the firstname, lastname and email
    const userResponse = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/users/${userId}`,
        { firstname, lastname, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    });


    if (userResponse.isError) {
      throw new Error(
        typeof userResponse.errors === "string"
          ? userResponse.errors
          : userResponse.errors.join(", ")
      );
    }



    // Here you would typically handle the business profile logic, such as calling an API
    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/users/profile/${userId}`,
        {
          business_name: businessName,
          phone_no: phone,
          address: serviceAddress,
          field: expertiseArea,
          experience: professionalExperience,
          rate: businessRate,
          country,
          bio,
          working_schedule: workSchedule, // We set this data when user creates a business profile
          roles: "Business Account",
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
      "Profile was updated partially"
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

"use server";

import { z } from "zod/v4";

import { personalProfileSchema } from "@/lib/definitions";
import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";

export interface PersonalProfileState {
  token?: string | undefined;
  userId?: string | undefined;
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

    if (state?.token === undefined) {
      throw new Error("Token is undefined");
    }

    if (state?.userId === undefined) {
      throw new Error("User ID is undefined");
    }

    if (!validatedFields.success) {
      return {
        userId: state.userId,
        token: state.token,
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { firstname, lastname } = validatedFields.data;

    const response = await tryCatch(
      async () =>
    await axios.patch(
      `https://tabula-rasa-backend.up.railway.app/users/${state.userId}`,
      {
        firstname,
        lastname,
      }, {
        headers: {
          "Authorization": `Bearer ${state.token}`,
          "Content-Type": "application/json"
        }
      }
    )
    );

    // const response = await fetch(
    //   `https://tabula-rasa-backend.up.railway.app/users/${state.userId}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${state.token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       firstname,
    //       lastname
    //     })
    //   }
    // );



    //  if (!response.ok) {
    //   throw new Error(`Response status: ${response.status}`);
    // }
    // const data = await response.json();
    // console.log(data);

    if (response.isError) {
      console.log(response.errors, "Error on take me home.");
      throw new Error("Failed to update personal profile");
    }

      return {
        token: state.token,
        success: true,
        data: {
          firstname: validatedFields.data.firstname,
          lastname: validatedFields.data.lastname,
        },
        message: "Personal profile updated successfully.",
      };
    
  } catch (error) {
    return {
      token: state?.token,
      error: true,
      errorData: error,
      message: "Failed to update personal profile.",
    };
  }
}

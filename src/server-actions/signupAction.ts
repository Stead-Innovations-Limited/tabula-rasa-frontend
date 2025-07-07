"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";

import z from "zod/v4";
import { signupSchema } from "@/lib/definitions";

export interface SignupState {
  success?: boolean;
  data?: { email: string; password: string };
  message?: string;
  error?: boolean;
  errors?: { email?: string[] };
}

type SignupFormData = z.infer<typeof signupSchema>;

export default async function signupAction(
  state: SignupState | undefined,
  formData: SignupFormData
) {
  const validatedFields = signupSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { firstname, lastname, email, password } = formData;

  const response = await tryCatch(
    async () =>
      await axios.post("https://tabula-rasa-backend.up.railway.app/register/", {
        firstname,
        lastname,
        email,
        password,
      })
  );
  if (response.isError) {
    return {
      error: true,
      errorData: response.errors,
      message: "Signup failed.",
    };
  } else {
    const data = response.data as { message?: string };
    return {
      success: true,
      data: { email, password }, // Simulating a user object
      message: data.message || "Registration successful. Please check your email to verify your account.",
    };
  }
}

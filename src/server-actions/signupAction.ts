"use client";
import { redirect } from "next/navigation";

import z from "zod/v4";
import { signupSchema } from "@/lib/definitions";

export interface SignupState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: { email?: string[] };
}

type SignupFormData = z.infer<typeof signupSchema>;

export interface LoginFormData {
  email: string;
  password: string;
}

export default async function signupAction(
  state: SignupState | undefined,
  formData: SignupFormData
) {
  try {
    const validatedFields = signupSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { email, password } = validatedFields.data;

    // Here you would typically handle the login logic, such as calling an API
    console.log("Logging in with:", email, password);

    redirect("/");
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to subscribe to our newsletter.",
    };
  }
}

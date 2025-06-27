"use server";

import z from "zod/v4";
import { loginSchema } from "@/lib/definitions";

export interface LoginState {
  success?: boolean;
  message?: string;
  data?: {email: string, password: string};
  error?: boolean;
  errors?: { email?: string[] };
}

export interface LoginFormData {
  email: string;
  password: string;
}

export default async function loginAction(
  state: LoginState | undefined,
  formData: LoginFormData
) {
  // try {
  const validatedFields = loginSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: true,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Invalid login credentials. Please check your email and password.",
    };
  }

  const { email, password } = validatedFields.data;
   
  return {
    success: true,
    data: { email, password },
    message: "Login successful",
  };
}

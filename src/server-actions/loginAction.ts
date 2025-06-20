"use client";
import { redirect } from "next/navigation";
import z from "zod/v4";
import { loginSchema } from "@/lib/definitions";

export interface LoginState {
  success?: boolean;
  message?: string;
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
  try {
    const validatedFields = loginSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { email, password } = validatedFields.data;

    // Here you would typically handle the login logic, such as calling an API
    console.log("Logging in with:", email, password);
    if(email === "admin@gmail.com" && password == "Admin1123#") {
      return {
        success: true,
        data: { email, password }, // Simulating a user object
        message: "Login successful",
      };
    }

    redirect("/");
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to subscribe to our newsletter.",
    };
  }
}

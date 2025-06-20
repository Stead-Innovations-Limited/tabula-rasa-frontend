"use server";

// import { redirect } from "next/navigation";

import z from "zod/v4";
import { signupSchema } from "@/lib/definitions";

export interface SignupState {
  success?: boolean;
  message?: string;
  error?: boolean;
  errors?: { email?: string[] };
}

type SignupFormData = z.infer<typeof signupSchema>;

export default async function signupAction(
  state: SignupState | undefined,
  formData: SignupFormData
) {
  try {
    const validatedFields = signupSchema.safeParse(formData);

    console.log(validatedFields);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { email, password } = formData;
    if(email !== "admin@gmail.com" && password !== "Admin1123#") {
      return {
      error: true,
      errorData: null,
      message: "Wrong Email or Password",
    };
    }
    console.log(formData)

    // Here you would typically handle the login logic, such as calling an API
    // console.log("Logging in with:", email, password);

    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...formData }),
    // });

    // const data = await res.json();
    // console.log("Response from signup:", data);

    // if (!res.ok) {
    //   return { success: false, message: data.message || "Login failed" };
    // }

    // redirect("/");
    return {
    success: true,
    data: { email, password }, // Simulating a user object
    message: `Account sucessfully created`,
  };
  } catch (error) {
    console.log(error, "My fams")
    return {
      error: true,
      errorData: error,
      message: "Failed to subscribe to our newsletter.",
    };
  }
}

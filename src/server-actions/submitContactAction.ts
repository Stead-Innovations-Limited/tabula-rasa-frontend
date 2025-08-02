"use server";

import { z } from "zod/v4";
import { contactSchema } from "@/lib/definitions";

export interface contactState {
  success?: boolean;
  data?: {
    name: string;
    email: string;
    message: string;
  };
  message?: string;
  error?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

type contactFormData = z.infer<typeof contactSchema>;

export default async function submitContactAction(
  state: contactState | undefined,
  data: contactFormData
) {
  try {
    const validatedFields = contactSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { name, email, message } = validatedFields.data;

    return { 
      error: false,
      data: {name, email, message},
      message: "Message was submitted successfully"
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: true,  message: "Failed to submit message." };
  }
}

"use server";
interface subscriptionState {
  success?: boolean,
  message?: string,
  error?: boolean,
  errors?: { email?: string[]}
}
import { mailSubscriptionSchema } from "@/lib/definitions";

export default async function subscribeAction(state: subscriptionState | undefined, formData:FormData) {
  try {
    const validatedFields = mailSubscriptionSchema.safeParse({
      email: formData.get("email"),
    });
    if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email } = validatedFields.data;

  return {
    success: true,
    message: `Subscription with email address: ${email} was successful.`
  }

  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to subscribe to our newsletter.",
    };
  }
}

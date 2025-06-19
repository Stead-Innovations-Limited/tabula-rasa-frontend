import { z } from "zod/v4";

export const mailSubscriptionSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim()
});
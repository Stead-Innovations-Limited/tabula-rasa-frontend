import { z } from "zod/v4";

export const mailSubscriptionSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
});

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
});

export const signupSchema = z.object({
  firstname: z.string().min(2, {message: "Fullname cannot be less than 2 characters"})
    .max(80, { message: "Fullname cannot be 80 characters long."}),
  lastname: z.string().min(2, {message: "Fullname cannot be less than 2 characters"})
    .max(80, { message: "Fullname cannot be 80 characters long."}),
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Confirm Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Confirm Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Confirm Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Confirm Password must contain at least one special character",
    }),

})

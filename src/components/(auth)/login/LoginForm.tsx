"use client";

import { useActionState, useEffect, startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import { loginSchema } from "@/lib/definitions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/reusable-ui/Input";
import {
  AiOutlineLoading3Quarters,
  FcGoogle,
  FaApple,
} from "@/components/icons";

import loginAction from "@/server-actions/loginAction";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(loginAction, undefined);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state?.error) {
      toast.error(state.message, {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
    }

    if (state?.success) {
      (async () => {
        const result = await signIn("credentials", {
          email: state.data?.email,
          password: state.data?.password,
          redirect: false,
        });

        // Here we check if the result.error value is that EMAIL_NOT_VERIFIED, if so we redirect the user to the verify email page.
        // With token and email.
        if (result?.error) {
          // Parse obj body
          const err = JSON.parse(result.error);

          if (typeof err === "object") {
            if (err.error === "EMAIL_NOT_VERIFIED") {
              localStorage.setItem("email", err.email);
              // We tell the user that a confirmation message was sent to their mail
              toast.error("Your email has not been verified yet, please check your mail for a confirmation mail.", {
                classNames: {
                  toast: "!text-red-500",
                  title: "!text-red-500",
                  description: "!text-red-500",
                },
              });
              router.push("/verify-email");
              return; /** We return untimely **/
            }
          }
        }

        if (result?.error) {
          toast.error("Login failed. Please check your credentials.", {
            classNames: {
              toast: "!text-red-500",
              title: "!text-red-500",
              description: "!text-red-500",
            },
          });
        } else {
          toast.success("Login successful! Redirecting to dashboard...", {
            classNames: {
              toast: "!text-green-700",
              title: "!text-green-700",
              description: "!text-green-700",
            },
          });

          router.push("/dashboard");
        }
      })();
    }
  }, [state, router]);

  function onSubmit(formData: z.infer<typeof loginSchema>) {
    form.reset();

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className='md:px-5 md:shadow-xs md:shadow-olive/20 md:rounded-md'>
      <div className='md:max-w-sm w-full p-5 py-14 font-roboto flex flex-col gap-5'>
        <div className='flex flex-col items-center gap-2 text-center text-olive'>
          <h1 className='text-2xl font-bold font-nunito'>Welcome Back</h1>
          {/* <p className='text-muted-foreground text-sm text-balance'>
            Enter your email below to login to your account
          </p> */}
        </div>
        {/* The form Inputs */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-olive'>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='you@example.com'
                      {...field}
                      className='py-2 border-1 border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-olive'>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='w-full flex items-center justify-center'>
              <Button
                type='submit'
                className='bg-olive hover:bg-olive/80 text-white disabled:bg-olive/80 px-8'
              >
                {isPending ? (
                  <>
                    Loading{" "}
                    <AiOutlineLoading3Quarters className='animate-spin size-4' />
                  </>
                ) : (
                  <>Log In</>
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* The seperator and metas */}
        <div className='flex flex-col items-center justify-center gap-4'>
          <p className=''>
            Don’t have an account? &nbsp;
            <Link href='/signup' className='font-semibold text-lightolive'>
              Sign Up
            </Link>
          </p>

          <hr className='w-full border-olive' />

          <div className='flex items-center justify-center gap-2'>
            <Button className='bg-white hover:bg-white/80 !px-8 py-6 shadow-sm shadow-olive/10'>
              <FcGoogle className='size-6' />
            </Button>
            <Button className='bg-white hover:bg-white/80 !px-8 py-6 shadow-sm shadow-olive/10'>
              <FaApple className='size-6 text-black' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

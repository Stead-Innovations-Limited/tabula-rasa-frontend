"use client";

import { useActionState, useEffect, startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import { signupSchema } from "@/lib/definitions";

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
import {
  ConfirmPasswordInput,
  PasswordInput,
} from "@/components/reusable-ui/Input";
import {
  AiOutlineLoading3Quarters,
  FcGoogle,
  FaApple,
} from "@/components/icons";

import signupAction from "@/server-actions/signupAction";
import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(signupAction, undefined);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      // Store the email in local Storage
      localStorage.setItem("email", state.data?.email);
      toast.success(state.message, {
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });
      // Redirect to /verify-email
      router.push("/verify-email");
    }
  }, [state, router]);

  function onSubmit(formData: z.infer<typeof signupSchema>) {
    form.reset();

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className='md:px-5 md:shadow-xs md:shadow-olive/20 md:rounded-md '>
      <div className='md:max-w-sm w-full p-5 py-14 font-roboto flex flex-col gap-5'>
        <div className='flex flex-col items-center gap-2 text-center text-olive'>
          <h1 className='text-2xl font-bold font-nunito'>
            Create Your Tabula Rasa Account
          </h1>
          {/* <p className='text-muted-foreground text-sm text-balance'>
            Enter your email below to login to your account
          </p> */}
        </div>
        {/* The form Inputs */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='firstname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-olive'>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Bisi'
                      type='text'
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
              name='lastname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-olive'>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Adebayo'
                      type='text'
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-olive'>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
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
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-olive'>Confirm Password</FormLabel>
                  <FormControl>
                    <ConfirmPasswordInput
                      placeholder='Re-Enter your password'
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
                  <>Sign up</>
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* The seperator and metas */}
        <div className='flex flex-col items-center justify-center gap-4'>
          <p className=''>
            Already have an account? &nbsp;
            <Link href='/login' className='font-semibold text-lightolive'>
              Log In
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
